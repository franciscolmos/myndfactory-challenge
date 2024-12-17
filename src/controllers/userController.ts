import { Request, Response } from 'express';
import { getAllUsers, getUserById, updateUserService, deleteUserService } from '../services/userService';
import { updateUserSchema } from '../utils/validationSchemas';

export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}

export async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const user = await getUserById(parseInt(id, 10));
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  const { id } = req.params;
  const { name, email, age, password } = req.body;

  try {
    const user = await getUserById(parseInt(id, 10));
    const updatedUser = await updateUserService(user.id, { name, email, age, password });
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    await getUserById(parseInt(id, 10));
    await deleteUserService(parseInt(id, 10));
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}
