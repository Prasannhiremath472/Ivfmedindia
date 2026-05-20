const { sequelize } = require('../config/db');
const User = require('./User');
const Admin = require('./Admin');
const Doctor = require('./Doctor');
const TreatmentCategory = require('./TreatmentCategory');
const Treatment = require('./Treatment');
const Location = require('./Location');
const Appointment = require('./Appointment');
const BlogCategory = require('./BlogCategory');
const Blog = require('./Blog');
const Testimonial = require('./Testimonial');
const FAQ = require('./FAQ');
const Lead = require('./Lead');
const SEO = require('./SEO');
const SuccessStory = require('./SuccessStory');
const Notification = require('./Notification');

// Treatment belongs to TreatmentCategory
Treatment.belongsTo(TreatmentCategory, { foreignKey: 'category_id', as: 'category', onDelete: 'SET NULL' });
TreatmentCategory.hasMany(Treatment, { foreignKey: 'category_id', as: 'treatments' });

// Appointment associations
Appointment.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'SET NULL' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor', onDelete: 'SET NULL' });
Appointment.belongsTo(Location, { foreignKey: 'location_id', as: 'location', onDelete: 'SET NULL' });
Appointment.belongsTo(Treatment, { foreignKey: 'treatment_id', as: 'treatment', onDelete: 'SET NULL' });
User.hasMany(Appointment, { foreignKey: 'user_id', as: 'appointments' });
Doctor.hasMany(Appointment, { foreignKey: 'doctor_id', as: 'appointments' });

// Doctor ↔ Location (many-to-many)
Doctor.belongsToMany(Location, { through: 'doctor_locations', foreignKey: 'doctor_id', as: 'locations' });
Location.belongsToMany(Doctor, { through: 'doctor_locations', foreignKey: 'location_id', as: 'doctors' });

// Doctor ↔ Treatment (many-to-many)
Doctor.belongsToMany(Treatment, { through: 'doctor_treatments', foreignKey: 'doctor_id', as: 'treatments' });
Treatment.belongsToMany(Doctor, { through: 'doctor_treatments', foreignKey: 'treatment_id', as: 'doctors' });

// Blog associations
Blog.belongsTo(BlogCategory, { foreignKey: 'category_id', as: 'category', onDelete: 'SET NULL' });
Blog.belongsTo(Admin, { foreignKey: 'author_id', as: 'author', onDelete: 'SET NULL' });
BlogCategory.hasMany(Blog, { foreignKey: 'category_id', as: 'blogs' });

// Testimonial associations
Testimonial.belongsTo(Treatment, { foreignKey: 'treatment_id', as: 'treatment', onDelete: 'SET NULL' });
Testimonial.belongsTo(Location, { foreignKey: 'location_id', as: 'location', onDelete: 'SET NULL' });

// FAQ associations
FAQ.belongsTo(Treatment, { foreignKey: 'treatment_id', as: 'treatment', onDelete: 'SET NULL' });
Treatment.hasMany(FAQ, { foreignKey: 'treatment_id', as: 'faqs' });

// Lead associations
Lead.belongsTo(Location, { foreignKey: 'location_id', as: 'location', onDelete: 'SET NULL' });
Lead.belongsTo(Treatment, { foreignKey: 'treatment_id', as: 'treatment', onDelete: 'SET NULL' });
Lead.belongsTo(Admin, { foreignKey: 'assigned_to', as: 'assignedAdmin', onDelete: 'SET NULL' });

// SuccessStory associations
SuccessStory.belongsTo(Treatment, { foreignKey: 'treatment_id', as: 'treatment', onDelete: 'SET NULL' });

// Notification associations
Notification.belongsTo(Admin, { foreignKey: 'admin_id', as: 'admin', onDelete: 'CASCADE' });

module.exports = {
  sequelize,
  User,
  Admin,
  Doctor,
  TreatmentCategory,
  Treatment,
  Location,
  Appointment,
  BlogCategory,
  Blog,
  Testimonial,
  FAQ,
  Lead,
  SEO,
  SuccessStory,
  Notification,
};
