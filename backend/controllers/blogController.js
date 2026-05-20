const { Blog, BlogCategory, Admin } = require('../models');
const { buildPaginationOptions, formatPaginationResponse, slugify } = require('../utils/queryHelpers');
const { Op } = require('sequelize');
const { uploadToCloudinary } = require('../middleware/upload');
const logger = require('../utils/logger');

const getBlogs = async (req, res) => {
  try {
    const { page, limit, offset } = buildPaginationOptions(req.query);
    const { category_id, featured, search, tag } = req.query;

    const where = { status: 'published' };
    if (category_id) where.category_id = category_id;
    if (featured === 'true') where.is_featured = true;
    if (search) where[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { excerpt: { [Op.like]: `%${search}%` } },
    ];

    const { count, rows } = await Blog.findAndCountAll({
      where,
      include: [{ model: BlogCategory, as: 'category', attributes: ['id', 'name', 'slug'] }],
      attributes: { exclude: ['content', 'schema_markup'] },
      order: [['published_at', 'DESC']],
      distinct: true,
      limit,
      offset,
    });

    res.json({ success: true, ...formatPaginationResponse(rows, count, page, limit) });
  } catch (error) {
    logger.error('Get blogs error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: { slug: req.params.slug, status: 'published' },
      include: [{ model: BlogCategory, as: 'category' }],
    });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    await blog.increment('views');

    const related = await Blog.findAll({
      where: { category_id: blog.category_id, status: 'published', id: { [Op.ne]: blog.id } },
      attributes: ['id', 'title', 'slug', 'featured_image', 'published_at', 'read_time', 'excerpt'],
      limit: 4,
    });

    res.json({ success: true, blog, related });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blog' });
  }
};

const createBlog = async (req, res) => {
  try {
    const data = req.body;
    data.slug = data.slug || slugify(data.title);
    data.author_id = req.admin?.id;
    data.author_name = data.author_name || req.admin?.name;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, 'blogs');
      data.featured_image = result.secure_url;
    }

    if (data.status === 'published' && !data.published_at) data.published_at = new Date();
    if (data.tags && typeof data.tags === 'string') data.tags = JSON.parse(data.tags);

    const blog = await Blog.create(data);
    res.status(201).json({ success: true, message: 'Blog created', blog });
  } catch (error) {
    logger.error('Create blog error:', error);
    res.status(500).json({ success: false, message: 'Failed to create blog' });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    const data = req.body;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, 'blogs');
      data.featured_image = result.secure_url;
    }
    if (data.status === 'published' && !blog.published_at) data.published_at = new Date();

    await blog.update(data);
    res.json({ success: true, message: 'Blog updated', blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update blog' });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    await blog.update({ status: 'archived' });
    res.json({ success: true, message: 'Blog archived' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete blog' });
  }
};

const getBlogCategories = async (req, res) => {
  try {
    const categories = await BlogCategory.findAll({
      where: { is_active: true },
      order: [['sort_order', 'ASC']],
    });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
};

module.exports = { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog, getBlogCategories };
