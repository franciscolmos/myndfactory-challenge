const prisma = require('@prisma/client');
const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();

// Create user
async function createUser(req, res) {
  try {
    const { name, email, age, password } = req.body;
    const newUser = await prismaClient.user.create({
      data: {
        name,
        email,
        age,
        password,  // Aquí puedes agregar lógica para cifrar la contraseña si lo deseas
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all users
async function getUsers(req, res) {
  try {
    const users = await prismaClient.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get user by id
async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }

// Update user
async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, age, password } = req.body;
  
  try {
    const updatedUser = await prismaClient.user.update({
      where: { id: Number(id) },
      data: { name, email, age, password },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete user
async function deleteUser(req, res) {
  const { id } = req.params;
  
  try {
    await prismaClient.user.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
