# IVFMedIndia — Enterprise IVF Fertility Platform

A full production-ready IVF & fertility website platform inspired by Nova IVF, Apollo Fertility, and Cloudnine.

## Tech Stack
- **Frontend:** React 18 · Vite · TypeScript · Tailwind CSS · Framer Motion · GSAP · Zustand · Swiper.js · React Helmet Async
- **Backend:** Node.js · Express.js · MySQL 8 · Sequelize ORM · JWT · Nodemailer · Cloudinary
- **Deployment:** Hostinger VPS / Shared Hosting

## Quick Start

```bash
cd IVFMedIndia
npm run install:all   # installs root + backend + frontend deps
```

Configure `backend/.env` and `frontend/.env` (see env examples in each folder), then:

```bash
# Import DB (MySQL)
mysql -u root -p < backend/database/schema.sql
mysql -u root -p < backend/database/seed.sql

# Start dev servers
npm run dev           # starts both backend:5000 and frontend:5173
```

Admin Panel: http://localhost:5173/admin  
Default login: admin@ivfmedindia.com / Admin@123456

## Hostinger Deployment

### VPS Steps
1. SSH into VPS, install Node.js 20 + MySQL 8 + PM2
2. Upload project, run `npm install --production` in backend
3. Build frontend: `cd frontend && npm run build`
4. Import DB schema and seed SQL
5. Start API: `pm2 start backend/server.js --name ivfmedindia-api`
6. Configure Nginx to proxy `/api` to port 5000, serve `frontend/dist` for all other routes
7. Add SSL via `certbot --nginx`

### Shared Hosting (hPanel Node.js)
1. hPanel → Advanced → Node.js → Create app (root: `backend/`, startup: `server.js`)
2. Upload project, configure env vars in hPanel
3. Build frontend and upload `frontend/dist/` as public_html

## Website Routes
`/` Home | `/about-us` | `/treatments/:slug` | `/doctors` | `/doctors/:slug`  
`/blogs` | `/blogs/:slug` | `/ivf-centre/:city` | `/ivf-centre/:city/:clinic`  
`/patient-testimonials` | `/success-stories` | `/faq` | `/contact-us` | `/book-appointment`

## Admin Routes
`/admin` Dashboard | `/admin/leads` | `/admin/appointments` | `/admin/doctors`  
`/admin/blogs` | `/admin/testimonials` | `/admin/seo` | `/admin/settings`

## API Endpoints
`POST /api/auth/login` · `POST /api/appointments` · `POST /api/leads`  
`GET /api/treatments/:slug` · `GET /api/doctors/:slug` · `GET /api/blogs/:slug`  
`GET /api/locations/city/:city` · `GET /api/seo/sitemap` · `POST /api/chatbot/message`

© 2024 IVFMedIndia. All rights reserved.