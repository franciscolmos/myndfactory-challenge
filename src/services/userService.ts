import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

export async function updateUserService(id: number, data: { name?: string, email?: string, age?: number, password?: string }) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return prisma.user.update({
    where: { id },
    data
  });
}

export async function deleteUserService(id: number) {
  return prisma.user.delete({
    where: { id }
  });
}
