const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const diskStorage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, `../uploads/${folder}`);
      if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, PNG, GIF, WebP) and PDFs are allowed'));
  }
};

const createUploader = (folder, maxSize = 10 * 1024 * 1024) =>
  multer({
    storage: diskStorage(folder),
    limits: { fileSize: maxSize },
    fileFilter,
  });

const uploadToCloudinary = async (filePath, folder) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: `ivfmedindia/${folder}`,
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  });
  fs.unlinkSync(filePath);
  return result;
};

module.exports = {
  uploadDoctor: createUploader('doctors'),
  uploadBlog: createUploader('blogs'),
  uploadTreatment: createUploader('treatments'),
  uploadTestimonial: createUploader('testimonials'),
  uploadLocation: createUploader('locations'),
  uploadHero: createUploader('hero'),
  uploadGeneral: createUploader('general'),
  uploadToCloudinary,
  cloudinary,
};
