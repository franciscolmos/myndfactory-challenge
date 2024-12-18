import express from 'express';
import  userRoutes  from './routes/userRoutes';
import { setupSwagger } from './swagger';
import  authRoutes from './routes/authRoutes';

const app = express();
const port = 3000;

app.use(express.json());

setupSwagger(app);

// Usar el enrutador de usuarios
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Middleware para manejar errores
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});