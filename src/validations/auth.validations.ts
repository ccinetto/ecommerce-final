import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { validationHandler } from './handler.validation';

export class authValidation {
  static async signupValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const signupSchema = joi.object({
      nombre: joi.string().min(3).max(50).required(),
      email: joi.string().email().required(),
      telefono: joi
        .string()
        .pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
        .messages({
          'string.pattern.base': `"" debe ser numero telefonico empezando con +`,
        })
        .required(),
      password: joi.string().min(6).required(),
      admin: joi.boolean().required(),
    });
    await validationHandler(signupSchema, req, res, next);
  }

  static async loginValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const loginSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    });
    await validationHandler(loginSchema, req, res, next);
  }
}
