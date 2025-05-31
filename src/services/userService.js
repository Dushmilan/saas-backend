const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

class UserService {
  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async getUserById(id) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async createUser(userData) {
    const { email, password, name } = userData;

    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Hash password with stronger salt rounds
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with normalized email
    return await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name.trim()
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });
  }

  async loginUser(credentials) {
    const { email, password } = credentials;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      // Use vague error message for security
      throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      // Add delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { 
        userId: user.id,
        version: user.tokenVersion // Add token versioning
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: '1h',
        audience: 'your-app-name',
        issuer: 'your-app-name'
      }
    );

    return { 
      token,
      userId: user.id,
      expiresIn: 3600 // 1 hour in seconds
    };
  }

  async updateUser(id, updateData) {
    return await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        updatedAt: true
      }
    });
  }

  async deleteUser(id) {
    return await prisma.user.delete({
      where: { id }
    });
  }
}

module.exports = new UserService();