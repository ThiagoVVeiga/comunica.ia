import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

interface SecurityLog {
  timestamp: string;
  ip: string;
  method: string;
  url: string;
  userAgent: string;
  statusCode: number;
  responseTime: number;
  type: 'request' | 'error' | 'security';
  details?: string;
}

class SecurityLogger {
  private logFile: string;

  constructor() {
    this.logFile = path.join(process.cwd(), 'logs', 'security.log');
    this.ensureLogDirectory();
  }

  private ensureLogDirectory() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  private writeLog(log: SecurityLog) {
    const logEntry = JSON.stringify(log) + '\n';
    fs.appendFileSync(this.logFile, logEntry);
  }

  logRequest(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    
    res.on('finish', () => {
      const responseTime = Date.now() - startTime;
      
      const log: SecurityLog = {
        timestamp: new Date().toISOString(),
        ip: req.ip || req.connection.remoteAddress || 'unknown',
        method: req.method,
        url: req.url,
        userAgent: req.get('User-Agent') || 'unknown',
        statusCode: res.statusCode,
        responseTime,
        type: 'request'
      };

      // Log suspicious activities
      if (res.statusCode >= 400) {
        log.type = 'error';
        log.details = `HTTP ${res.statusCode}`;
      }

      // Log potential security issues
      if (this.isSuspiciousRequest(req)) {
        log.type = 'security';
        log.details = 'Suspicious request detected';
      }

      this.writeLog(log);
    });

    next();
  }

  private isSuspiciousRequest(req: Request): boolean {
    const suspiciousPatterns = [
      /\.\./, // Path traversal
      /<script/i, // XSS attempts
      /union.*select/i, // SQL injection
      /javascript:/i, // JavaScript protocol
      /on\w+\s*=/i, // Event handlers
      /eval\s*\(/i, // Code injection
      /base64/i, // Base64 encoding (potential obfuscation)
    ];

    const url = req.url.toLowerCase();
    const userAgent = (req.get('User-Agent') || '').toLowerCase();
    const body = JSON.stringify(req.body || {}).toLowerCase();

    return suspiciousPatterns.some(pattern => 
      pattern.test(url) || pattern.test(userAgent) || pattern.test(body)
    );
  }

  logSecurityEvent(type: string, details: string, req: Request) {
    const log: SecurityLog = {
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress || 'unknown',
      method: req.method,
      url: req.url,
      userAgent: req.get('User-Agent') || 'unknown',
      statusCode: 0,
      responseTime: 0,
      type: 'security',
      details: `${type}: ${details}`
    };

    this.writeLog(log);
  }
}

const securityLogger = new SecurityLogger();

export const securityLogging = securityLogger.logRequest.bind(securityLogger);
export const logSecurityEvent = securityLogger.logSecurityEvent.bind(securityLogger);
