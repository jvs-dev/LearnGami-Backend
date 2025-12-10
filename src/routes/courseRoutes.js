const express = require('express');
const authMiddleware = require('../middlewares/auth');
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getPublicCourses,
} = require('../controllers/courseController');

const router = express.Router();

// public routes
router.get('/public', getPublicCourses);

// protected routes
router.post('/', authMiddleware, createCourse);
router.get('/', authMiddleware, getCourses);
router.get('/:id', authMiddleware, getCourseById);
router.put('/:id', authMiddleware, updateCourse);
router.delete('/:id', authMiddleware, deleteCourse);

module.exports = router;
