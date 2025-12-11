const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new lesson
const createLesson = async (req, res) => {
  try {
    const { name, description, coverImage, videoUrl, courseId } = req.body;
    const userId = req.userId;

    if (!name || !description || !videoUrl || !courseId) {
      return res.status(400).json({ error: 'Nome, descrição, URL do vídeo e ID do curso são obrigatórios' });
    }

    // Check if the course belongs to the authenticated user
    const course = await prisma.course.findFirst({
      where: {
        id: parseInt(courseId),
        userId: userId,
      },
    });

    if (!course) {
      return res.status(404).json({ error: 'Curso não encontrado ou não pertence ao usuário' });
    }

    const lesson = await prisma.lesson.create({
      data: {
        name,
        description,
        coverImage: coverImage || null,
        videoUrl,
        courseId: parseInt(courseId),
      },
    });

    res.status(201).json({
      message: 'Aula criada com sucesso',
      lesson,
    });
  } catch (error) {
    console.error('Erro ao criar aula:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Get all lessons for a specific course
const getLessonsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    // Check if the course belongs to the authenticated user
    const course = await prisma.course.findFirst({
      where: {
        id: parseInt(courseId),
        userId: userId,
      },
    });

    if (!course) {
      return res.status(404).json({ error: 'Curso não encontrado ou não pertence ao usuário' });
    }

    const lessons = await prisma.lesson.findMany({
      where: { courseId: parseInt(courseId) },
      orderBy: { createdAt: 'asc' },
    });

    res.status(200).json(lessons);
  } catch (error) {
    console.error('Erro ao buscar aulas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Get a specific lesson
const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const lesson = await prisma.lesson.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        course: true,
      },
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Aula não encontrada' });
    }

    // Check if the course belongs to the authenticated user
    if (lesson.course.userId !== userId) {
      return res.status(403).json({ error: 'Aula não pertence ao usuário' });
    }

    res.status(200).json(lesson);
  } catch (error) {
    console.error('Erro ao buscar aula:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Update a lesson
const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, coverImage, videoUrl, status } = req.body;
    const userId = req.userId;

    const lesson = await prisma.lesson.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        course: true,
      },
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Aula não encontrada' });
    }

    // Check if the course belongs to the authenticated user
    if (lesson.course.userId !== userId) {
      return res.status(403).json({ error: 'Aula não pertence ao usuário' });
    }

    const updatedLesson = await prisma.lesson.update({
      where: { id: parseInt(id) },
      data: {
        name: name || lesson.name,
        description: description || lesson.description,
        coverImage: coverImage !== undefined ? coverImage : lesson.coverImage,
        videoUrl: videoUrl || lesson.videoUrl,
        status: status !== undefined ? status : lesson.status,
      },
    });

    res.status(200).json({
      message: 'Aula atualizada com sucesso',
      lesson: updatedLesson,
    });
  } catch (error) {
    console.error('Erro ao atualizar aula:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Delete a lesson
const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const lesson = await prisma.lesson.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        course: true,
      },
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Aula não encontrada' });
    }

    // Check if the course belongs to the authenticated user
    if (lesson.course.userId !== userId) {
      return res.status(403).json({ error: 'Aula não pertence ao usuário' });
    }

    await prisma.lesson.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Aula deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar aula:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Get public lessons for a course (for non-authenticated users)
const getPublicLessonsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Check if the course exists and is active
    const course = await prisma.course.findFirst({
      where: {
        id: parseInt(courseId),
        status: true,
      },
    });

    if (!course) {
      return res.status(404).json({ error: 'Curso não encontrado ou inativo' });
    }

    const lessons = await prisma.lesson.findMany({
      where: { 
        courseId: parseInt(courseId),
        status: true,
      },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        coverImage: true,
        videoUrl: true,
        createdAt: true,
      },
    });

    res.status(200).json(lessons);
  } catch (error) {
    console.error('Erro ao buscar aulas públicas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  updateLesson,
  deleteLesson,
  getPublicLessonsByCourse,
};