const roleAuth = (...roles) => {
  return (req, res, next) => {
    const user = req.admin || req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${user.role}' is not authorized for this action`,
      });
    }
    next();
  };
};

module.exports = roleAuth;
