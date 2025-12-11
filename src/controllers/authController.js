const { PrismaClient } = require('@prisma/client');
const { generateToken } = require('../utils/jwt');
const { hashPassword, comparePassword } = require('../utils/password');

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ error: 'Email, nome e senha são obrigatórios' });
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(409).json({ error: 'Usuário já cadastrado' });
    }

    const hashedPassword = hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'USER', // Explicitly set role to USER by default
      },
    });

    // Generate token with user ID and role
    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !comparePassword(password, user.password)) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Generate token with user ID and role
    const token = generateToken(user.id, user.role);

    res.status(200).json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Function to get user data
const getUserData = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// New function to get user count (admin only)
const getUserCount = async (req, res) => {
  try {
    // First, get the user to check if they are admin
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    // Check if user exists and is admin
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem acessar esta função.' });
    }

    // Get the total count of users
    const count = await prisma.user.count();

    res.status(200).json({
      count,
    });
  } catch (error) {
    console.error('Erro ao buscar contagem de usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  register,
  login,
  getUserData,
  getUserCount,
};