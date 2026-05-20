const { Op } = require('sequelize');

const buildPaginationOptions = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

const buildSearchFilter = (searchTerm, fields) => {
  if (!searchTerm) return {};
  return {
    [Op.or]: fields.map((field) => ({
      [field]: { [Op.like]: `%${searchTerm}%` },
    })),
  };
};

const buildSortOptions = (query, allowedFields, defaultField = 'created_at') => {
  const sortField = allowedFields.includes(query.sortBy) ? query.sortBy : defaultField;
  const sortOrder = query.sortOrder === 'asc' ? 'ASC' : 'DESC';
  return [[sortField, sortOrder]];
};

const formatPaginationResponse = (data, count, page, limit) => {
  return {
    data,
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      hasNextPage: page < Math.ceil(count / limit),
      hasPrevPage: page > 1,
    },
  };
};

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

module.exports = {
  buildPaginationOptions,
  buildSearchFilter,
  buildSortOptions,
  formatPaginationResponse,
  slugify,
};
