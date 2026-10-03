/**
 * OAuth2 / JWT Authentication & Role Guard Middleware
 * Protects candidate, assessor, and admin routes
 */

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'skillcred_ai_nsqf_secret_key_2026';

// Generate OAuth2 Bearer Access Token
function generateToken(userPayload) {
  return jwt.sign(userPayload, JWT_SECRET, { expiresIn: '24h' });
}

// Token Auth Guard Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Demo fallback mode: allow requests with demo header or bearer token
  if (!token && req.headers['x-demo-role']) {
    req.user = {
      id: 'usr-demo',
      name: 'Demo User',
      role: req.headers['x-demo-role'] || 'candidate'
    };
    return next();
  }

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Access Token Missing' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid or Expired Token' });
    }
    req.user = user;
    next();
  });
}

// Role Guard Middleware
function requireRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Forbidden: Action requires role [${allowedRoles.join(', ')}], but current role is '${req.user.role}'` 
      });
    }
    
    next();
  };
}

module.exports = {
  generateToken,
  authenticateToken,
  requireRole
};
