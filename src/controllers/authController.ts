import { Request, Response } from 'express';
import { userRegister, userLogin, refreshTokens } from '../services/authService';
import { registerSchema, loginSchema } from '../utils/validationSchemas';

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { name, email, age, password } = req.body;

    const { user, accessToken, refreshToken } = await userRegister(name, email, age, password);

    res.status(201).json({ user, accessToken, refreshToken });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await userLogin(email, password);

    res.status(200).json({ user, accessToken, refreshToken });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}

export async function refresh(req: Request, res: Response): Promise<void> {
  const { refreshToken } = req.body;

  try {
    const { accessToken, refreshToken: newRefreshToken } = await refreshTokens(refreshToken);
    res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}
