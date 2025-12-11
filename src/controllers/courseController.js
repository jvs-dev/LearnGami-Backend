const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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

const getCourses = async (req, res) => {
  try {
    const userId = req.userId;

    const courses = await prisma.course.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        lessons: {
          select: {
            id: true,
            name: true,
            status: true,
          }
        }
      }
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const course = await prisma.course.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
      include: {
        lessons: {
          select: {
            id: true,
            name: true,
            description: true,
            coverImage: true,
            videoUrl: true,
            status: true,
            createdAt: true,
          }
        }
      }
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

const getPublicCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        status: true
      },
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
            role: true,
          },
        },
        _count: {
          select: { lessons: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    const transformedCourses = courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      duration: course.duration,
      imageUrl: course.imageUrl,
      createdAt: course.createdAt,
      instructor: {
        name: course.user.name,
        role: course.user.role,
      },
      lessonCount: course._count.lessons
    }));

    res.status(200).json(transformedCourses);
  } catch (error) {
    console.error('Erro ao buscar cursos públicos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const getPublicCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findFirst({
      where: {
        id: parseInt(id),
        status: true
      },
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            name: true,
            role: true,
          },
        },
        lessons: {
          where: {
            status: true
          },
          select: {
            id: true,
            name: true,
            description: true,
            coverImage: true,
            videoUrl: true,
            createdAt: true,
          }
        },
        _count: {
          select: { lessons: true }
        }
      }
    });

    if (!course) {
      return res.status(404).json({ error: 'Curso não encontrado ou inativo' });
    }

    const transformedCourse = {
      id: course.id,
      title: course.title,
      description: course.description,
      duration: course.duration,
      imageUrl: course.imageUrl,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      instructor: {
        name: course.user.name,
        role: course.user.role,
      },
      lessons: course.lessons,
      lessonCount: course._count.lessons
    };

    res.status(200).json(transformedCourse);
  } catch (error) {
    console.error('Erro ao buscar curso público:', error);
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
  getPublicCourseById,
};