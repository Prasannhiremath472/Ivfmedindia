USE ivfmedindia_db;

-- ============================================================
-- SUPER ADMIN
-- ============================================================
INSERT INTO admins (name, email, password, role, is_active) VALUES
('Super Admin', 'admin@ivfmedindia.com',
 '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.i8e2', -- Admin@123456
 'super_admin', 1);

-- ============================================================
-- TREATMENT CATEGORIES
-- ============================================================
INSERT INTO treatment_categories (name, slug, description, icon, sort_order) VALUES
('IVF Treatments',    'ivf-treatments',    'In Vitro Fertilization and related procedures',      '🧬', 1),
('Fertility Preservation', 'fertility-preservation', 'Egg, sperm and embryo freezing options',   '❄️', 2),
('Male Infertility',  'male-infertility',  'Diagnosis and treatment of male fertility issues',   '👨', 3),
('Female Infertility','female-infertility','Diagnosis and treatment of female fertility issues',  '👩', 4),
('Donor Programs',    'donor-programs',    'Egg, sperm and embryo donation programs',             '💝', 5),
('Advanced Procedures','advanced-procedures','Advanced reproductive technologies',                '⚗️', 6);

-- ============================================================
-- TREATMENTS
-- ============================================================
INSERT INTO treatments (category_id, name, slug, short_description, success_rate, cost_range_min, cost_range_max, is_featured, sort_order) VALUES
(1, 'IVF Treatment', 'ivf-treatment', 'In Vitro Fertilization — the most effective fertility treatment with high success rates', '65-70%', 80000, 150000, 1, 1),
(1, 'ICSI Treatment', 'icsi-treatment', 'Intracytoplasmic Sperm Injection for male infertility', '60-65%', 90000, 160000, 1, 2),
(1, 'IUI Treatment', 'iui-treatment', 'Intrauterine Insemination — a simple and affordable fertility treatment', '15-20%', 8000, 25000, 1, 3),
(2, 'Egg Freezing', 'egg-freezing', 'Preserve your fertility by freezing eggs for future use', 'Varies', 50000, 100000, 1, 4),
(2, 'Embryo Freezing', 'embryo-freezing', 'Cryopreservation of embryos for future use', 'Varies', 15000, 30000, 0, 5),
(2, 'Sperm Freezing', 'sperm-freezing', 'Preserve sperm for future fertility treatments', 'Varies', 5000, 15000, 0, 6),
(2, 'Fertility Preservation', 'fertility-preservation', 'Comprehensive fertility preservation for cancer patients and others', 'Varies', 50000, 120000, 0, 7),
(6, 'Genetic Testing (PGT)', 'genetic-testing', 'Preimplantation Genetic Testing to screen embryos for chromosomal abnormalities', 'Improves by 30%', 30000, 60000, 0, 8),
(5, 'Donor Program', 'donor-program', 'Comprehensive egg, sperm and embryo donation program', 'Varies', 100000, 200000, 0, 9),
(5, 'Surrogacy', 'surrogacy', 'Gestational surrogacy program for those who cannot carry a pregnancy', 'Varies', 1200000, 2000000, 0, 10),
(3, 'Male Infertility', 'male-infertility', 'Comprehensive diagnosis and treatment of male fertility issues', 'Depends', 10000, 50000, 1, 11),
(4, 'Female Infertility', 'female-infertility', 'Diagnosis and treatment of female infertility causes', 'Depends', 10000, 80000, 1, 12),
(4, 'PCOS Treatment', 'pcos-treatment', 'Polycystic Ovary Syndrome — diagnosis and fertility treatment', '60-70%', 15000, 60000, 1, 13),
(4, 'Endometriosis Treatment', 'endometriosis-treatment', 'Diagnosis and fertility-sparing treatment of endometriosis', 'Depends', 20000, 100000, 0, 14),
(4, 'Recurrent Pregnancy Loss', 'recurrent-pregnancy-loss', 'Investigation and treatment of repeated miscarriages', 'Depends', 20000, 80000, 0, 15),
(6, 'Advanced Fertility Treatment', 'advanced-fertility-treatment', 'Cutting-edge assisted reproductive technologies', 'Varies', 100000, 250000, 0, 16);

-- ============================================================
-- LOCATIONS
-- ============================================================
INSERT INTO locations (name, slug, city, city_slug, state, address, pincode, phone, email, whatsapp, is_featured, sort_order) VALUES
('IVFMedIndia Baner, Pune',    'pune-baner',    'Pune',      'pune',      'Maharashtra', 'Office No. 201, Kasturi Plaza, Baner Road, Baner, Pune', '411045', '+918888888801', 'pune.baner@ivfmedindia.com',    '918888888801', 1, 1),
('IVFMedIndia Kharadi, Pune',  'pune-kharadi',  'Pune',      'pune',      'Maharashtra', '3rd Floor, Zenith Business Park, Kharadi, Pune',          '411014', '+918888888802', 'pune.kharadi@ivfmedindia.com',  '918888888802', 0, 2),
('IVFMedIndia Hinjewadi, Pune','pune-hinjewadi','Pune',      'pune',      'Maharashtra', 'Phase 1, Hinjewadi IT Park Road, Hinjewadi, Pune',        '411057', '+918888888803', 'pune.hinjewadi@ivfmedindia.com','918888888803', 0, 3),
('IVFMedIndia Andheri, Mumbai','mumbai-andheri','Mumbai',    'mumbai',    'Maharashtra', '4th Floor, Business Hub, Andheri West, Mumbai',           '400058', '+918888888804', 'mumbai@ivfmedindia.com',        '918888888804', 1, 4),
('IVFMedIndia South Delhi',    'delhi-south',   'Delhi',     'delhi',     'Delhi',       'C-45, South Extension Part II, New Delhi',                '110049', '+918888888805', 'delhi@ivfmedindia.com',         '918888888805', 1, 5),
('IVFMedIndia Koramangala, Bangalore','bangalore-koramangala','Bangalore','bangalore','Karnataka','No. 23, 80 Feet Road, Koramangala 4th Block, Bangalore','560034','+918888888806','bangalore@ivfmedindia.com','918888888806', 1, 6),
('IVFMedIndia Banjara Hills, Hyderabad','hyderabad-banjara','Hyderabad','hyderabad','Telangana','Plot No. 89, Road No. 12, Banjara Hills, Hyderabad','500034','+918888888807','hyderabad@ivfmedindia.com','918888888807', 1, 7);

-- ============================================================
-- DOCTORS
-- ============================================================
INSERT INTO doctors (name, slug, designation, specialization, qualifications, experience_years, short_bio, success_rate, total_patients, is_featured, sort_order) VALUES
('Dr. Priya Sharma',     'dr-priya-sharma',     'Senior Fertility Specialist', 'IVF & Reproductive Medicine',
 'MBBS, MD (Obstetrics & Gynaecology), Fellowship in Reproductive Medicine (UK)', 18,
 'Dr. Priya Sharma is a renowned IVF specialist with 18+ years of experience, having helped over 3000 couples achieve parenthood.',
 68.5, 3200, 1, 1),
('Dr. Rajesh Malhotra',  'dr-rajesh-malhotra',  'Lead IVF Consultant',        'Male Infertility & Andrology',
 'MBBS, MS (Urology), MCh (Urology), Fellowship in Andrology (Germany)', 15,
 'Dr. Rajesh Malhotra is India''s leading andrologist specializing in male infertility and advanced sperm retrieval techniques.',
 72.0, 2800, 1, 2),
('Dr. Anjali Desai',     'dr-anjali-desai',     'Fertility & IVF Specialist', 'PCOS & Endometriosis',
 'MBBS, MD (Gynaecology), DNB, Fellowship in Reproductive Endocrinology (USA)', 12,
 'Dr. Anjali Desai specializes in PCOS management and endometriosis-related fertility treatment.',
 65.0, 2100, 1, 3),
('Dr. Vikram Nair',      'dr-vikram-nair',       'Embryologist & IVF Specialist','Embryology & Genetic Testing',
 'MBBS, MD, PhD in Embryology, Diploma in Clinical Embryology (Spain)', 14,
 'Dr. Vikram Nair is a clinical embryologist specializing in genetic testing and advanced IVF laboratory procedures.',
 70.0, 2500, 1, 4),
('Dr. Meera Krishnamurthy','dr-meera-krishnamurthy','Senior Gynaecologist & IVF Consultant','Reproductive Surgery',
 'MBBS, MS (OBG), Fellowship in Laparoscopic Fertility Surgery (Australia)', 16,
 'Dr. Meera Krishnamurthy is an expert in fertility-preserving surgeries and advanced laparoscopic procedures.',
 66.5, 2700, 0, 5);

-- ============================================================
-- BLOG CATEGORIES
-- ============================================================
INSERT INTO blog_categories (name, slug, sort_order) VALUES
('IVF & Fertility', 'ivf-fertility', 1),
('PCOS & Hormones', 'pcos-hormones', 2),
('Male Infertility', 'male-infertility-blog', 3),
('Pregnancy Tips',  'pregnancy-tips', 4),
('Success Stories', 'success-stories-blog', 5),
('Expert Advice',   'expert-advice', 6);

-- ============================================================
-- FAQS (General & Treatment-specific)
-- ============================================================
INSERT INTO faq (treatment_id, category, question, answer, is_featured, sort_order) VALUES
(NULL, 'General', 'What is IVF?',
 'IVF (In Vitro Fertilization) is an assisted reproductive technology where eggs are fertilized by sperm outside the body in a laboratory. The resulting embryo is then transferred into the uterus. IVFMedIndia has a success rate of 65-70% per cycle.', 1, 1),
(NULL, 'General', 'What is the cost of IVF in India?',
 'The cost of IVF in India typically ranges from ₹80,000 to ₹1,50,000 per cycle at IVFMedIndia. This includes consultation, monitoring, egg retrieval, fertilization, and embryo transfer. Additional costs may apply for medications and advanced procedures.', 1, 2),
(NULL, 'General', 'How many IVF cycles are needed?',
 'Most couples achieve success within 2-3 IVF cycles. Our cumulative success rate over 3 cycles is over 85%. Each case is unique and our specialists will recommend the best protocol for your specific situation.', 1, 3),
(NULL, 'General', 'What is the success rate at IVFMedIndia?',
 'IVFMedIndia maintains a clinical pregnancy rate of 65-70% per cycle, which is among the highest in India. Success rates vary based on age, diagnosis, and protocol. Couples below 35 have success rates up to 72%.', 1, 4),
(1, 'IVF', 'How long does an IVF cycle take?',
 'An IVF cycle typically takes 4-6 weeks from the start of stimulation to pregnancy test. The process includes ovarian stimulation (10-14 days), egg retrieval, fertilization in the lab (3-5 days), embryo development, and embryo transfer.', 1, 5),
(3, 'IUI', 'What is the difference between IUI and IVF?',
 'IUI (Intrauterine Insemination) is a simpler procedure where sperm is directly placed in the uterus, while IVF (In Vitro Fertilization) involves fertilization outside the body. IUI is less invasive and costs less, but has lower success rates (15-20%) compared to IVF (65-70%).', 1, 6),
(NULL, 'General', 'Is IVF treatment painful?',
 'Most patients experience minimal discomfort during IVF. The injections for ovarian stimulation may cause mild bloating. Egg retrieval is done under sedation so there is no pain. Some cramping may occur after embryo transfer, which resolves within a day or two.', 1, 7),
(NULL, 'General', 'What are the age limits for IVF?',
 'IVFMedIndia treats patients up to age 50 (with donor eggs). Natural IVF success is highest below age 35. Between 35-40, success rates are 45-55%. Between 40-45, donor egg programs are often recommended. Age is just one factor — our doctors assess each case individually.', 1, 8);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
INSERT INTO testimonials (patient_name, patient_city, age, rating, testimonial, short_testimonial, treatment_name, success_year, is_featured, is_active, sort_order) VALUES
('Sneha & Rohit Patel', 'Pune', 32, 5,
 'After 5 years of trying and 2 failed IVF cycles at other clinics, we found IVFMedIndia. Dr. Priya Sharma and her team were exceptional. She adjusted our protocol, and in the first cycle at IVFMedIndia, we got pregnant! Our twin babies are now 2 years old. We are eternally grateful.',
 'After 5 years and 2 failed cycles, IVFMedIndia gave us our twin babies!', 'IVF Treatment', 2022, 1, 1, 1),
('Kavita & Arun Mehta', 'Mumbai', 35, 5,
 'IVFMedIndia changed our lives forever. I was diagnosed with severe PCOS and was told IVF was our only option. Dr. Anjali Desai was incredibly patient and explained everything. We conceived on our second cycle. Our daughter just turned 1!',
 'PCOS was not a barrier — Dr. Anjali made our dream come true!', 'IVF with PCOS', 2023, 1, 1, 2),
('Preethi & Karthik Iyer', 'Bangalore', 38, 5,
 'We had 4 failed IVF cycles before coming to IVFMedIndia. The genetic testing (PGT) they recommended identified embryo issues that previous clinics missed. With a healthy embryo, we finally conceived. Our son was born last year, completely healthy.',
 'PGT at IVFMedIndia identified what 4 previous cycles missed!', 'IVF with PGT', 2023, 1, 1, 3),
('Nisha & Deepak Sharma', 'Delhi', 30, 5,
 'We chose IVFMedIndia based on their success rates, and we are so glad we did. The entire team — from the receptionist to the lab staff — made us feel so comfortable and supported. IUI was successful for us in the second attempt!',
 'Successful IUI on second attempt — the support was incredible!', 'IUI Treatment', 2024, 1, 1, 4);

-- ============================================================
-- SUCCESS STORIES
-- ============================================================
INSERT INTO success_stories (couple_name, city, short_story, treatment_name, years_of_struggle, success_year, is_featured, is_active) VALUES
('Rahul & Sunita Verma', 'Pune',     'After 7 years of waiting and 3 failed cycles elsewhere, IVFMedIndia gave us our miracle baby girl through IVF. Dr. Priya''s personalized approach made all the difference.', 'IVF Treatment', 7, 2023, 1, 1),
('Arjun & Pooja Kulkarni', 'Mumbai', 'We were told we could never conceive naturally due to low sperm count. IVFMedIndia''s ICSI treatment gave us our baby boy. Dr. Rajesh was outstanding throughout.', 'ICSI Treatment', 5, 2023, 1, 1),
('Suresh & Lakshmi Rao', 'Hyderabad','A decade of infertility. Three miscarriages. Then IVFMedIndia''s expert team discovered and treated my uterine issues. Today our twins fill our home with joy.', 'IVF with PGT', 10, 2024, 1, 1);

-- ============================================================
-- HOMEPAGE BANNERS
-- ============================================================
INSERT INTO homepage_banners (title, subtitle, description, image, cta_text, cta_url, badge_text, is_active, sort_order) VALUES
('Your Dream of Parenthood Starts Here',
 'India''s Most Trusted IVF & Fertility Center',
 'Experience world-class fertility care with 65-70% IVF success rates, advanced technology, and compassionate support.',
 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=1920&q=80',
 'Book Free Consultation', '/book-appointment', 'NABH Accredited', 1, 1),
('Advanced IVF Technology for Higher Success',
 'State-of-the-art IVF Laboratory',
 'Our cutting-edge embryology lab and experienced specialists deliver the best possible outcomes for your fertility journey.',
 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=80',
 'Explore Treatments', '/treatments/ivf-treatment', 'ISO Certified', 1, 2),
('Over 10,000+ Happy Families',
 'Trusted by Patients Across India',
 'Join thousands of families who have fulfilled their dream of parenthood with IVFMedIndia''s expert care.',
 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=1920&q=80',
 'Read Success Stories', '/success-stories', '65-70% Success Rate', 1, 3);

-- ============================================================
-- SEO METADATA (Key Pages)
-- ============================================================
INSERT INTO seo_metadata (page_path, page_type, title, description, keywords) VALUES
('/', 'home',
 'IVFMedIndia - Best IVF Centre in India | 65-70% Success Rate',
 'IVFMedIndia is India''s leading IVF & fertility treatment center. Get world-class IVF, ICSI, IUI treatments with 65-70% success rates in Pune, Mumbai, Delhi, Bangalore, Hyderabad.',
 'IVF centre India, best IVF hospital, IVF treatment Pune, IVF treatment Mumbai, fertility specialist India, IVF success rate'),
('/treatments/ivf-treatment', 'treatment',
 'IVF Treatment in India - Cost, Success Rate | IVFMedIndia',
 'Get the best IVF treatment in India at IVFMedIndia. IVF success rate 65-70%, cost ₹80,000-₹1,50,000. Expert fertility specialists, state-of-the-art embryology lab.',
 'IVF treatment India, IVF cost India, IVF success rate, best IVF hospital India, in vitro fertilization'),
('/doctors', 'doctor',
 'Best IVF Doctors & Fertility Specialists in India | IVFMedIndia',
 'Meet our team of experienced IVF doctors and fertility specialists at IVFMedIndia. 18+ years experience, trained at top institutions worldwide.',
 'best IVF doctor India, fertility specialist, IVF specialist Pune, IVF specialist Mumbai'),
('/blogs', 'blog',
 'Fertility & IVF Blog - Expert Advice | IVFMedIndia',
 'Read expert fertility advice, IVF tips, PCOS management guides, and success stories on the IVFMedIndia blog.',
 'IVF blog, fertility tips, PCOS treatment blog, IVF success stories, fertility expert advice');
