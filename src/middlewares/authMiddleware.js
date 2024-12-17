// src/middlewares/authMiddleware.js
const { process } = require('@hapi/joi/lib/errors');
const jwt = require('jsonwebtoken');

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().positive().required(),
    password: Joi.string().min(7).required()
  });

// Verificate JWT middleware
async function authMiddleware(req, res, next) {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });
    
        const { name, email, age, password } = req.body;
    
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ error: 'Email already registered' });
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await prisma.user.create({
          data: {
            name,
            email,
            age,
            password: hashedPassword
          }
        });
    
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
        res.status(201).json({ user, token });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = authMiddleware;
