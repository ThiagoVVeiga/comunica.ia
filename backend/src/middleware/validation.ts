import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Validation schemas
export const pictogramSearchSchema = Joi.object({
  query: Joi.string().min(1).max(100).required(),
  limit: Joi.number().integer().min(1).max(50).default(20),
  offset: Joi.number().integer().min(0).default(0)
});

export const categorySchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  icon: Joi.string().min(1).max(10).required(),
  color: Joi.string().pattern(/^bg-\w+-\d+$/).optional(),
  description: Joi.string().max(200).optional()
});

export const phraseSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  text: Joi.string().min(1).max(200).required(),
  pictograms: Joi.array().items(Joi.string()).max(10).optional()
});

export const settingsSchema = Joi.object({
  theme: Joi.string().valid('light', 'dark', 'high-contrast').required(),
  fontSize: Joi.string().valid('small', 'medium', 'large', 'extra-large').required(),
  gridSize: Joi.string().valid('small', 'medium', 'large').required(),
  language: Joi.string().min(2).max(10).required(),
  speechRate: Joi.number().min(0.1).max(3.0).optional(),
  speechPitch: Joi.number().min(0.1).max(3.0).optional(),
  speechVolume: Joi.number().min(0.0).max(1.0).optional(),
  showText: Joi.boolean().optional(),
  showImages: Joi.boolean().optional(),
  autoSpeak: Joi.boolean().optional()
});

// Validation middleware factory
export const validate = (schema: Joi.ObjectSchema, property: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errorMessage
      });
    }

    // Replace the original data with validated and sanitized data
    req[property] = value;
    next();
  };
};

// Sanitization middleware
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  const sanitizeString = (str: string): string => {
    return str
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers
  };

  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    }
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    }
    if (obj && typeof obj === 'object') {
      const sanitized: any = {};
      for (const key in obj) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
      return sanitized;
    }
    return obj;
  };

  // Sanitize body, query, and params
  if (req.body) req.body = sanitizeObject(req.body);
  if (req.query) req.query = sanitizeObject(req.query);
  if (req.params) req.params = sanitizeObject(req.params);

  next();
};

// Content-Type validation middleware
export const validateContentType = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    const contentType = req.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        success: false,
        message: 'Content-Type must be application/json'
      });
    }
  }
  next();
};
