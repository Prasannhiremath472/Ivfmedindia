const jwt = require('jsonwebtoken');
const { User, Admin } = require('../models');
const logger = require('../utils/logger');

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      user = await Admin.findByPk(decoded.id, {
        attributes: { exclude: ['password'] },
      });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

const adminProtect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Admin access required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!admin || !admin.is_active) {
      return res.status(403).json({ success: false, message: 'Admin access denied' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    logger.error('Admin auth middleware error:', error);
    return res.status(401).json({ success: false, message: 'Admin authorization failed' });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
    }
  } catch (_) {}
  next();
};

module.exports = { protect, adminProtect, optionalAuth };
