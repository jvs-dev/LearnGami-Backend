const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Criar curso
const createCourse = async (req, res) => {
  try {
    const { title, description, duration, imageUrl, status } = req.body;
    const userId = req.userId;

    if (!title || !description || !duration) {
      return res.status(400).json({ error: 'Título, descrição e duração são obrigatórios' });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        duration: parseInt(duration),
        imageUrl: imageUrl || null,
        status: status !== undefined ? status : true,
        userId,
      },
    });

    res.status(201).json({
      message: 'Curso criado com sucesso',
      course,
    });
  } catch (error) {
    console.error('Erro ao criar curso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Listar todos os cursos do usuário autenticado
const getCourses = async (req, res) => {
  try {
    const userId = req.userId;

    const courses = await prisma.course.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Listar curso por ID
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const course = await prisma.course.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!course) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Erro ao buscar curso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Atualizar curso
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, imageUrl, status } = req.body;
    const userId = req.userId;

    const course = await prisma.course.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!course) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }

    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(id) },
      data: {
        title: title || course.title,
        description: description || course.description,
        duration: duration ? parseInt(duration) : course.duration,
        imageUrl: imageUrl !== undefined ? imageUrl : course.imageUrl,
        status: status !== undefined ? status : course.status,
      },
    });

    res.status(200).json({
      message: 'Curso atualizado com sucesso',
      course: updatedCourse,
    });
  } catch (error) {
    console.error('Erro ao atualizar curso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Deletar curso
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const course = await prisma.course.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!course) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }

    await prisma.course.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Curso deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar curso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Catálogo público de cursos (sem autenticação)
const getPublicCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { status: true },
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        imageUrl: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error('Erro ao buscar cursos públicos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getPublicCourses,
};
