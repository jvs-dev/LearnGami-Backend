const express = require('express');
const authMiddleware = require('../middlewares/auth');
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getPublicCourses,
  getPublicCourseById,
} = require('../controllers/courseController');

const router = express.Router();

router.get('/public', getPublicCourses);
router.get('/public/:id', getPublicCourseById);

router.post('/', authMiddleware, createCourse);
router.get('/', authMiddleware, getCourses);
router.get('/:id', authMiddleware, getCourseById);
router.put('/:id', authMiddleware, updateCourse);
router.delete('/:id', authMiddleware, deleteCourse);

module.exports = router;