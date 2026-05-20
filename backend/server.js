require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

const { connectDB } = require('./config/db');
const logger = require('./utils/logger');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// ─── App ────────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// ─── Ensure log directory exists ─────────────────────────────────────────────
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

// ─── Security & Performance ───────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(compression());

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'https://www.ivfmedindia.com',
  'https://ivfmedindia.com',
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Rate Limiting ────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || 100),
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/admin', authLimiter);

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Logging ─────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  }));
}

// ─── Static Files ─────────────────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'IVFMedIndia API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',          require('./routes/auth'));
app.use('/api/appointments',  require('./routes/appointments'));
app.use('/api/doctors',       require('./routes/doctors'));
app.use('/api/treatments',    require('./routes/treatments'));
app.use('/api/blogs',         require('./routes/blogs'));
app.use('/api/leads',         require('./routes/leads'));
app.use('/api/locations',     require('./routes/locations'));
app.use('/api/testimonials',  require('./routes/testimonials'));
app.use('/api/seo',           require('./routes/seo'));
app.use('/api/faq',           require('./routes/faq'));
app.use('/api/chatbot',       require('./routes/chatbot'));
app.use('/api/admin',         require('./routes/admin'));

// Sitemap & robots (also served from here so BE alone serves them if needed)
app.get('/sitemap.xml', require('./routes/seo').stack?.find(l => l.route?.path === '/sitemap')?.route?.stack[0]?.handle || ((req, res) => {
  res.redirect('/api/seo/sitemap');
}));

app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\nSitemap: https://www.ivfmedindia.com/sitemap.xml\n`);
});

// ─── Serve Frontend (Production) ─────────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  // Try multiple paths — works for both local and Hostinger deployment
  const possiblePaths = [
    path.join(__dirname, '../frontend/dist'),   // local: backend/../frontend/dist
    path.join(__dirname, '../../frontend/dist'), // if backend is nested
    path.join(process.cwd(), 'frontend/dist'),  // from project root
    path.join(process.cwd(), 'public_html'),    // Hostinger static hosting
  ];

  const frontendBuild = possiblePaths.find(p => fs.existsSync(p));

  if (frontendBuild) {
    logger.info(`Serving frontend from: ${frontendBuild}`);
    app.use(express.static(frontendBuild, { maxAge: '1y', etag: false }));
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
        res.sendFile(path.join(frontendBuild, 'index.html'));
      }
    });
  } else {
    logger.warn('Frontend build not found. Run: cd frontend && npm run build');
  }
}

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const startServer = async () => {
  try {
    await connectDB();
  } catch (err) {
    logger.error('DB connection error (non-fatal):', err.message);
  }

  app.listen(PORT, '0.0.0.0', () => {
    logger.info(`🚀 IVFMedIndia running on port ${PORT} [${process.env.NODE_ENV || 'production'}]`);
    logger.info(`❤️  Health check: http://localhost:${PORT}/health`);
  });
};

startServer().catch((error) => {
  console.error('FATAL startup error:', error);
  process.exit(1);
});

module.exports = app;
