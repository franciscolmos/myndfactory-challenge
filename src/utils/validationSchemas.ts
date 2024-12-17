import Joi from '@hapi/joi';

export const updateUserSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    age: Joi.number().integer().positive(),
    password: Joi.string().min(6)
});
  
export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().positive().required(),
    password: Joi.string().min(7).required()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});