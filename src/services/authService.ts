import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const generateAccessToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY as string, { expiresIn: '1h' });
};

const generateRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.REFRESH_SECRET_KEY as string, { expiresIn: '7d' });
};

export async function userRegister(name: string, email: string, age: number, password: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
        name,
        email,
        age,
        password: hashedPassword
        }
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.refreshToken.create({
        data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }
    });

    return { user, accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
  
}

export async function userLogin(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    }
  });

  return { user, accessToken, refreshToken };
}

export async function refreshTokens(refreshToken: string) {
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY as string) as { userId: number };
    const storedToken = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!storedToken) {
      throw new Error('Invalid refresh token');
    }

    const accessToken = generateAccessToken(payload.userId);
    const newRefreshToken = generateRefreshToken(payload.userId);

    await prisma.refreshToken.delete({ where: { token: refreshToken } });
    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: payload.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }
    });

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
}
