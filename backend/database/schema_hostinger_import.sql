
-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  email           VARCHAR(150) NOT NULL UNIQUE,
  phone           VARCHAR(15)  NOT NULL,
  password        VARCHAR(255) NOT NULL,
  role            ENUM('user','patient') DEFAULT 'user',
  gender          ENUM('male','female','other') NULL,
  date_of_birth   DATE NULL,
  city            VARCHAR(100) NULL,
  state           VARCHAR(100) NULL,
  profile_image   VARCHAR(500) NULL,
  is_verified     TINYINT(1) DEFAULT 0,
  is_active       TINYINT(1) DEFAULT 1,
  otp             VARCHAR(6)  NULL,
  otp_expiry      DATETIME NULL,
  last_login      DATETIME NULL,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- ADMINS
-- ============================================================
CREATE TABLE IF NOT EXISTS admins (
  id                   INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name                 VARCHAR(100) NOT NULL,
  email                VARCHAR(150) NOT NULL UNIQUE,
  password             VARCHAR(255) NOT NULL,
  role                 ENUM('super_admin','admin','editor','viewer') DEFAULT 'admin',
  permissions          JSON NULL,
  profile_image        VARCHAR(500) NULL,
  is_active            TINYINT(1) DEFAULT 1,
  last_login           DATETIME NULL,
  two_factor_enabled   TINYINT(1) DEFAULT 0,
  two_factor_secret    VARCHAR(255) NULL,
  created_at           DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at           DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role  (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TREATMENT CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS treatment_categories (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  slug        VARCHAR(150) NOT NULL UNIQUE,
  description TEXT NULL,
  icon        VARCHAR(200) NULL,
  sort_order  INT UNSIGNED DEFAULT 0,
  is_active   TINYINT(1) DEFAULT 1,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TREATMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS treatments (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id       INT UNSIGNED NULL,
  name              VARCHAR(200) NOT NULL,
  slug              VARCHAR(250) NOT NULL UNIQUE,
  short_description VARCHAR(500) NULL,
  description       LONGTEXT NULL,
  causes            LONGTEXT NULL,
  symptoms          LONGTEXT NULL,
  `procedure`       LONGTEXT NULL,
  benefits          LONGTEXT NULL,
  risks             LONGTEXT NULL,
  success_rate      VARCHAR(50) NULL,
  cost_range_min    INT UNSIGNED NULL,
  cost_range_max    INT UNSIGNED NULL,
  duration          VARCHAR(100) NULL,
  hero_image        VARCHAR(500) NULL,
  icon              VARCHAR(200) NULL,
  card_image        VARCHAR(500) NULL,
  gallery           JSON NULL,
  steps             JSON NULL,
  is_featured       TINYINT(1) DEFAULT 0,
  is_active         TINYINT(1) DEFAULT 1,
  sort_order        INT UNSIGNED DEFAULT 0,
  meta_title        VARCHAR(200) NULL,
  meta_description  TEXT NULL,
  meta_keywords     TEXT NULL,
  schema_markup     LONGTEXT NULL,
  created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug        (slug),
  INDEX idx_category    (category_id),
  INDEX idx_featured    (is_featured),
  INDEX idx_active      (is_active),
  CONSTRAINT fk_treatment_category FOREIGN KEY (category_id)
    REFERENCES treatment_categories(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DOCTORS
-- ============================================================
CREATE TABLE IF NOT EXISTS doctors (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name              VARCHAR(150) NOT NULL,
  slug              VARCHAR(200) NOT NULL UNIQUE,
  designation       VARCHAR(200) NULL,
  specialization    VARCHAR(255) NOT NULL,
  qualifications    TEXT NULL,
  experience_years  INT UNSIGNED DEFAULT 0,
  profile_image     VARCHAR(500) NULL,
  bio               TEXT NULL,
  short_bio         VARCHAR(500) NULL,
  expertise         JSON NULL,
  languages         JSON NULL,
  consultation_fee  DECIMAL(10,2) NULL,
  available_days    JSON NULL,
  available_times   JSON NULL,
  phone             VARCHAR(15) NULL,
  email             VARCHAR(150) NULL,
  linkedin          VARCHAR(300) NULL,
  publications      JSON NULL,
  awards            JSON NULL,
  success_rate      DECIMAL(5,2) NULL,
  total_patients    INT UNSIGNED DEFAULT 0,
  is_featured       TINYINT(1) DEFAULT 0,
  is_active         TINYINT(1) DEFAULT 1,
  sort_order        INT UNSIGNED DEFAULT 0,
  meta_title        VARCHAR(200) NULL,
  meta_description  TEXT NULL,
  created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug     (slug),
  INDEX idx_featured (is_featured),
  INDEX idx_active   (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- LOCATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS locations (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name              VARCHAR(200) NOT NULL,
  slug              VARCHAR(250) NOT NULL UNIQUE,
  city              VARCHAR(100) NOT NULL,
  city_slug         VARCHAR(100) NOT NULL,
  state             VARCHAR(100) NULL,
  address           TEXT NOT NULL,
  pincode           VARCHAR(10) NULL,
  phone             VARCHAR(15) NULL,
  email             VARCHAR(150) NULL,
  whatsapp          VARCHAR(15) NULL,
  lat               DECIMAL(10,8) NULL,
  lng               DECIMAL(11,8) NULL,
  map_embed_url     TEXT NULL,
  hero_image        VARCHAR(500) NULL,
  gallery           JSON NULL,
  facilities        JSON NULL,
  timings           JSON NULL,
  description       LONGTEXT NULL,
  short_description VARCHAR(500) NULL,
  is_featured       TINYINT(1) DEFAULT 0,
  is_active         TINYINT(1) DEFAULT 1,
  sort_order        INT UNSIGNED DEFAULT 0,
  meta_title        VARCHAR(200) NULL,
  meta_description  TEXT NULL,
  created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug      (slug),
  INDEX idx_city      (city),
  INDEX idx_city_slug (city_slug),
  INDEX idx_active    (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DOCTOR <-> LOCATION (many-to-many)
-- ============================================================
CREATE TABLE IF NOT EXISTS doctor_locations (
  doctor_id   INT UNSIGNED NOT NULL,
  location_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (doctor_id, location_id),
  CONSTRAINT fk_dl_doctor   FOREIGN KEY (doctor_id)   REFERENCES doctors(id)   ON DELETE CASCADE,
  CONSTRAINT fk_dl_location FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DOCTOR <-> TREATMENT (many-to-many)
-- ============================================================
CREATE TABLE IF NOT EXISTS doctor_treatments (
  doctor_id    INT UNSIGNED NOT NULL,
  treatment_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (doctor_id, treatment_id),
  CONSTRAINT fk_dt_doctor    FOREIGN KEY (doctor_id)    REFERENCES doctors(id)    ON DELETE CASCADE,
  CONSTRAINT fk_dt_treatment FOREIGN KEY (treatment_id) REFERENCES treatments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- APPOINTMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS appointments (
  id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  booking_id          VARCHAR(20) NOT NULL UNIQUE,
  user_id             INT UNSIGNED NULL,
  doctor_id           INT UNSIGNED NULL,
  location_id         INT UNSIGNED NULL,
  treatment_id        INT UNSIGNED NULL,
  patient_name        VARCHAR(150) NOT NULL,
  patient_phone       VARCHAR(15) NOT NULL,
  patient_email       VARCHAR(150) NULL,
  patient_age         INT UNSIGNED NULL,
  patient_gender      ENUM('male','female','other') NULL,
  appointment_date    DATE NOT NULL,
  appointment_time    TIME NOT NULL,
  appointment_type    ENUM('consultation','follow_up','procedure','emergency') DEFAULT 'consultation',
  status              ENUM('pending','confirmed','cancelled','completed','no_show','rescheduled') DEFAULT 'pending',
  message             TEXT NULL,
  notes               TEXT NULL,
  admin_notes         TEXT NULL,
  source              VARCHAR(100) DEFAULT 'website',
  is_paid             TINYINT(1) DEFAULT 0,
  payment_amount      DECIMAL(10,2) NULL,
  reminder_sent       TINYINT(1) DEFAULT 0,
  confirmed_at        DATETIME NULL,
  cancelled_at        DATETIME NULL,
  cancellation_reason TEXT NULL,
  created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_booking_id (booking_id),
  INDEX idx_user       (user_id),
  INDEX idx_doctor     (doctor_id),
  INDEX idx_date       (appointment_date),
  INDEX idx_status     (status),
  CONSTRAINT fk_appt_user      FOREIGN KEY (user_id)      REFERENCES users(id)      ON DELETE SET NULL,
  CONSTRAINT fk_appt_doctor    FOREIGN KEY (doctor_id)    REFERENCES doctors(id)    ON DELETE SET NULL,
  CONSTRAINT fk_appt_location  FOREIGN KEY (location_id)  REFERENCES locations(id)  ON DELETE SET NULL,
  CONSTRAINT fk_appt_treatment FOREIGN KEY (treatment_id) REFERENCES treatments(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- BLOG CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_categories (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  slug        VARCHAR(150) NOT NULL UNIQUE,
  description TEXT NULL,
  image       VARCHAR(500) NULL,
  sort_order  INT UNSIGNED DEFAULT 0,
  is_active   TINYINT(1) DEFAULT 1,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- BLOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS blogs (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id      INT UNSIGNED NULL,
  author_id        INT UNSIGNED NULL,
  title            VARCHAR(300) NOT NULL,
  slug             VARCHAR(350) NOT NULL UNIQUE,
  excerpt          TEXT NULL,
  content          LONGTEXT NULL,
  featured_image   VARCHAR(500) NULL,
  gallery          JSON NULL,
  tags             JSON NULL,
  author_name      VARCHAR(150) NULL,
  author_image     VARCHAR(500) NULL,
  author_bio       TEXT NULL,
  read_time        INT UNSIGNED DEFAULT 5,
  views            INT UNSIGNED DEFAULT 0,
  likes            INT UNSIGNED DEFAULT 0,
  status           ENUM('draft','published','archived') DEFAULT 'draft',
  is_featured      TINYINT(1) DEFAULT 0,
  published_at     DATETIME NULL,
  meta_title       VARCHAR(200) NULL,
  meta_description TEXT NULL,
  meta_keywords    TEXT NULL,
  og_image         VARCHAR(500) NULL,
  schema_markup    LONGTEXT NULL,
  created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug       (slug),
  INDEX idx_category   (category_id),
  INDEX idx_status     (status),
  INDEX idx_featured   (is_featured),
  INDEX idx_published  (published_at),
  CONSTRAINT fk_blog_category FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE SET NULL,
  CONSTRAINT fk_blog_author   FOREIGN KEY (author_id)   REFERENCES admins(id)          ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TESTIMONIALS
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  treatment_id      INT UNSIGNED NULL,
  location_id       INT UNSIGNED NULL,
  patient_name      VARCHAR(150) NOT NULL,
  patient_image     VARCHAR(500) NULL,
  patient_city      VARCHAR(100) NULL,
  age               INT UNSIGNED NULL,
  rating            TINYINT UNSIGNED DEFAULT 5,
  testimonial       LONGTEXT NOT NULL,
  short_testimonial TEXT NULL,
  video_url         VARCHAR(500) NULL,
  video_thumbnail   VARCHAR(500) NULL,
  treatment_name    VARCHAR(200) NULL,
  success_year      YEAR NULL,
  is_featured       TINYINT(1) DEFAULT 0,
  is_video          TINYINT(1) DEFAULT 0,
  is_active         TINYINT(1) DEFAULT 1,
  sort_order        INT UNSIGNED DEFAULT 0,
  created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_treatment (treatment_id),
  INDEX idx_featured  (is_featured),
  INDEX idx_active    (is_active),
  CONSTRAINT fk_test_treatment FOREIGN KEY (treatment_id) REFERENCES treatments(id) ON DELETE SET NULL,
  CONSTRAINT fk_test_location  FOREIGN KEY (location_id)  REFERENCES locations(id)  ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- FAQ
-- ============================================================
CREATE TABLE IF NOT EXISTS faq (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  treatment_id INT UNSIGNED NULL,
  category     VARCHAR(100) NULL,
  question     TEXT NOT NULL,
  answer       LONGTEXT NOT NULL,
  is_featured  TINYINT(1) DEFAULT 0,
  is_active    TINYINT(1) DEFAULT 1,
  sort_order   INT UNSIGNED DEFAULT 0,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_treatment (treatment_id),
  INDEX idx_active    (is_active),
  CONSTRAINT fk_faq_treatment FOREIGN KEY (treatment_id) REFERENCES treatments(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- LEADS
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  location_id     INT UNSIGNED NULL,
  treatment_id    INT UNSIGNED NULL,
  name            VARCHAR(150) NOT NULL,
  phone           VARCHAR(15)  NOT NULL,
  email           VARCHAR(150) NULL,
  age             INT UNSIGNED NULL,
  city            VARCHAR(100) NULL,
  message         TEXT NULL,
  source          ENUM('website','chatbot','whatsapp','call','walk_in','referral','social_media','google_ads') DEFAULT 'website',
  utm_source      VARCHAR(100) NULL,
  utm_medium      VARCHAR(100) NULL,
  utm_campaign    VARCHAR(100) NULL,
  stage           ENUM('new','contacted','qualified','appointment_scheduled','converted','lost') DEFAULT 'new',
  assigned_to     INT UNSIGNED NULL,
  notes           TEXT NULL,
  follow_up_date  DATE NULL,
  converted_at    DATETIME NULL,
  is_active       TINYINT(1) DEFAULT 1,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phone      (phone),
  INDEX idx_stage      (stage),
  INDEX idx_source     (source),
  INDEX idx_location   (location_id),
  INDEX idx_assigned   (assigned_to),
  CONSTRAINT fk_lead_location  FOREIGN KEY (location_id)  REFERENCES locations(id)  ON DELETE SET NULL,
  CONSTRAINT fk_lead_treatment FOREIGN KEY (treatment_id) REFERENCES treatments(id) ON DELETE SET NULL,
  CONSTRAINT fk_lead_admin     FOREIGN KEY (assigned_to)  REFERENCES admins(id)     ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SEO METADATA
-- ============================================================
CREATE TABLE IF NOT EXISTS seo_metadata (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  page_path         VARCHAR(500) NOT NULL UNIQUE,
  page_type         ENUM('home','treatment','doctor','blog','location','about','contact','custom') DEFAULT 'custom',
  title             VARCHAR(200) NOT NULL,
  description       TEXT NULL,
  keywords          TEXT NULL,
  og_title          VARCHAR(200) NULL,
  og_description    TEXT NULL,
  og_image          VARCHAR(500) NULL,
  og_type           VARCHAR(50) DEFAULT 'website',
  twitter_card      VARCHAR(50) DEFAULT 'summary_large_image',
  twitter_title     VARCHAR(200) NULL,
  twitter_description TEXT NULL,
  twitter_image     VARCHAR(500) NULL,
  canonical_url     VARCHAR(500) NULL,
  robots            VARCHAR(100) DEFAULT 'index, follow',
  schema_markup     LONGTEXT NULL,
  custom_scripts    LONGTEXT NULL,
  is_active         TINYINT(1) DEFAULT 1,
  created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_page_path (page_path),
  INDEX idx_page_type (page_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SUCCESS STORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS success_stories (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  treatment_id      INT UNSIGNED NULL,
  couple_name       VARCHAR(200) NOT NULL,
  couple_image      VARCHAR(500) NULL,
  baby_image        VARCHAR(500) NULL,
  city              VARCHAR(100) NULL,
  story             LONGTEXT NOT NULL,
  short_story       TEXT NULL,
  treatment_name    VARCHAR(200) NULL,
  years_of_struggle INT UNSIGNED NULL,
  success_year      YEAR NULL,
  video_url         VARCHAR(500) NULL,
  is_featured       TINYINT(1) DEFAULT 0,
  is_active         TINYINT(1) DEFAULT 1,
  sort_order        INT UNSIGNED DEFAULT 0,
  created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_story_treatment FOREIGN KEY (treatment_id) REFERENCES treatments(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  admin_id   INT UNSIGNED NULL,
  type       ENUM('appointment','lead','contact','system','alert') DEFAULT 'system',
  title      VARCHAR(200) NOT NULL,
  message    TEXT NOT NULL,
  data       JSON NULL,
  is_read    TINYINT(1) DEFAULT 0,
  read_at    DATETIME NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_admin  (admin_id),
  INDEX idx_read   (is_read),
  INDEX idx_type   (type),
  CONSTRAINT fk_notif_admin FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- HOMEPAGE BANNERS
-- ============================================================
CREATE TABLE IF NOT EXISTS homepage_banners (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(300) NOT NULL,
  subtitle    TEXT NULL,
  description TEXT NULL,
  image       VARCHAR(500) NOT NULL,
  mobile_image VARCHAR(500) NULL,
  cta_text    VARCHAR(100) NULL,
  cta_url     VARCHAR(500) NULL,
  badge_text  VARCHAR(100) NULL,
  is_active   TINYINT(1) DEFAULT 1,
  sort_order  INT UNSIGNED DEFAULT 0,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- MEDIA GALLERY
-- ============================================================
CREATE TABLE IF NOT EXISTS media_gallery (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(300) NULL,
  alt_text    VARCHAR(300) NULL,
  file_path   VARCHAR(500) NOT NULL,
  file_type   VARCHAR(50) NULL,
  file_size   INT UNSIGNED NULL,
  width       INT UNSIGNED NULL,
  height      INT UNSIGNED NULL,
  folder      VARCHAR(100) DEFAULT 'general',
  uploaded_by INT UNSIGNED NULL,
  is_active   TINYINT(1) DEFAULT 1,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_folder (folder),
  CONSTRAINT fk_media_admin FOREIGN KEY (uploaded_by) REFERENCES admins(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- CONTACT SUBMISSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  phone      VARCHAR(15) NOT NULL,
  email      VARCHAR(150) NULL,
  subject    VARCHAR(300) NULL,
  message    TEXT NOT NULL,
  source     VARCHAR(100) DEFAULT 'contact_form',
  is_read    TINYINT(1) DEFAULT 0,
  replied_at DATETIME NULL,
  reply_note TEXT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_is_read (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
