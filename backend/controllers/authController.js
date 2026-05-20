const bcrypt = require('bcryptjs');
const { User, Admin } = require('../models');
const { generateToken, generateRefreshToken } = require('../utils/generateToken');
const { sendEmail } = require('../utils/mailer');
const logger = require('../utils/logger');

const register = async (req, res) => {
  try {
    const { name, email, phone, password, gender, city } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ success: false, message: 'Email already registered' });

    const user = await User.create({ name, email, phone, password, gender, city });
    const token = generateToken({ id: user.id, role: user.role });

    sendEmail({
      to: email,
      subject: 'Welcome to IVFMedIndia',
      html: `<h2>Welcome ${name}!</h2><p>Your account has been created successfully at IVFMedIndia.</p>`,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
    });
  } catch (error) {
    logger.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !user.is_active) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    await user.update({ last_login: new Date() });

    const token = generateToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    res.json({
      success: true,
      token,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, profile_image: user.profile_image },
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin || !admin.is_active) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid admin credentials' });

    await admin.update({ last_login: new Date() });

    const token = generateToken({ id: admin.id, role: admin.role, isAdmin: true });

    res.json({
      success: true,
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role, permissions: admin.permissions, profile_image: admin.profile_image },
    });
  } catch (error) {
    logger.error('Admin login error:', error);
    res.status(500).json({ success: false, message: 'Admin login failed' });
  }
};

const getProfile = async (req, res) => {
  res.json({ success: true, user: req.user });
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, gender, date_of_birth, city, state } = req.body;
    await req.user.update({ name, phone, gender, date_of_birth, city, state });
    res.json({ success: true, message: 'Profile updated', user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Profile update failed' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    await user.update({ password: newPassword });
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Password change failed' });
  }
};

module.exports = { register, login, adminLogin, getProfile, updateProfile, changePassword };
