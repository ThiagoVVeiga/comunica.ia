# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Pictogram search clear functionality
- Complete categories CRUD (create, edit, delete, select)
- Visual interface for category selection
- Form to add new categories
- **Security**: Input validation with Joi schemas
- **Security**: Data sanitization middleware
- **Security**: Enhanced CORS configuration
- **Security**: Security headers with Helmet
- **Security**: Rate limiting with IP-based restrictions
- **Security**: Security logging and threat detection
- **Security**: Content Security Policy (CSP)
- **Security**: Suspicious activity monitoring

### Changed
- Improved search experience with clear button
- Categories are now clickable and functional
- More responsive and intuitive interface
- **Security**: Enhanced request validation
- **Security**: Improved error handling
- **Security**: Better logging system

### Fixed
- Fixed infinite loop in useEffect components
- Resolved TypeScript errors in contexts
- Improved speech synthesis error handling
- Removed React Router warnings
- **Security**: Fixed potential XSS vulnerabilities
- **Security**: Improved input handling

### Security
- Implemented comprehensive input validation
- Added data sanitization to prevent XSS attacks
- Enhanced CORS configuration for better security
- Added security headers (X-Frame-Options, X-XSS-Protection, etc.)
- Implemented rate limiting to prevent brute force attacks
- Added security logging for threat detection
- Configured Content Security Policy (CSP)
- Added suspicious activity monitoring

## [0.1.0] - 2024-01-XX

### Added
- 🎉 **Initial release of TD Snap Web**
- Complete alternative communication interface
- Sidebar navigation system
- Home page with pictogram search
- Categories page with pictogram grid
- Custom phrases page
- Accessibility settings page
- Integrated speech synthesis
- Multiple theme support (light, dark, high contrast)
- Adjustable font sizes
- Speech synthesis settings (rate, pitch, volume)
- Hot reload for development
- Complete backend structure with Express
- ARASAAC API integration ready
- Complete development documentation
- Automated installation scripts

### Technical Details
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: Prisma ORM + PostgreSQL (ready)
- **Cache**: Redis (ready)
- **Deployment**: Docker + Docker Compose
- **Development**: Hot reload, ESLint, TypeScript strict mode

### Architecture
- Modular architecture with frontend/backend separation
- Context API for state management
- Reusable and accessible components
- RESTful API ready for integration
- Security and rate limiting middleware
- Centralized error handling

### Accessibility
- WCAG 2.1 AA compliance
- Complete keyboard navigation
- Screen reader support
- High contrast and adaptive themes
- Scalable font sizes
- Motion reduction for sensitive users

---

## How to Contribute

To add entries to the changelog:

1. **Added**: New features
2. **Changed**: Changes to existing functionality
3. **Deprecated**: Features that will be removed
4. **Removed**: Removed features
5. **Fixed**: Bug fixes
6. **Security**: Vulnerability fixes

### Entry Format

```markdown
### Added
- New feature X
- Improvement Y

### Changed
- Change to functionality Z

### Fixed
- Bug fix A
```

### Versioning

- **MAJOR** (X.0.0): Incompatible changes
- **MINOR** (0.X.0): Compatible new features
- **PATCH** (0.0.X): Compatible bug fixes
