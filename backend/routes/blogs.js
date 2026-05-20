const express = require('express');
const router = express.Router();
const { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog, getBlogCategories } = require('../controllers/blogController');
const { adminProtect } = require('../middleware/auth');
const { uploadBlog } = require('../middleware/upload');

router.get('/categories', getBlogCategories);
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', adminProtect, uploadBlog.single('featured_image'), createBlog);
router.put('/:id', adminProtect, uploadBlog.single('featured_image'), updateBlog);
router.delete('/:id', adminProtect, deleteBlog);

module.exports = router;
