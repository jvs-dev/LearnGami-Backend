const express = require('express');
const authMiddleware = require('../middlewares/auth');
const {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  updateLesson,
  deleteLesson,
  getPublicLessonsByCourse,
} = require('../controllers/lessonController');

const router = express.Router();

// Protected routes (require authentication)
router.post('/', authMiddleware, createLesson);
router.get('/course/:courseId', authMiddleware, getLessonsByCourse);
router.get('/:id', authMiddleware, getLessonById);
router.put('/:id', authMiddleware, updateLesson);
router.delete('/:id', authMiddleware, deleteLesson);

// Public route (no authentication required)
router.get('/public/course/:courseId', getPublicLessonsByCourse);

module.exports = router;