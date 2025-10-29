// Security Configuration
export const securityConfig = {
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // maximum 100 requests per IP
    skipSuccessfulRequests: false,
    skipFailedRequests: false
  },

  // CORS settings
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    maxAge: 86400 // 24 hours
  },

  // Helmet security headers
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  },

  // Input validation limits
  validation: {
    maxStringLength: 200,
    maxArrayLength: 10,
    maxFileSize: '10mb',
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },

  // Security logging
  logging: {
    logSuspiciousRequests: true,
    logFailedAttempts: true,
    logFile: 'logs/security.log',
    maxLogSize: '10MB',
    maxLogFiles: 5
  },

  // Environment-specific settings
  environment: {
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'test'
  }
};

// Security headers for responses
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
};

// Suspicious patterns for detection
export const suspiciousPatterns = [
  /\.\./, // Path traversal
  /<script/i, // XSS attempts
  /union.*select/i, // SQL injection
  /javascript:/i, // JavaScript protocol
  /on\w+\s*=/i, // Event handlers
  /eval\s*\(/i, // Code injection
  /base64/i, // Base64 encoding
  /document\.cookie/i, // Cookie access
  /window\.location/i, // Location manipulation
  /alert\s*\(/i, // Alert injection
  /confirm\s*\(/i, // Confirm injection
  /prompt\s*\(/i, // Prompt injection
];

// IP whitelist for admin operations (if needed)
export const adminIPs = process.env.ADMIN_IPS ? 
  process.env.ADMIN_IPS.split(',').map(ip => ip.trim()) : 
  [];

// Blocked IPs
export const blockedIPs = process.env.BLOCKED_IPS ? 
  process.env.BLOCKED_IPS.split(',').map(ip => ip.trim()) : 
  [];
