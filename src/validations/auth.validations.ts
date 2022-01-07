import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import j2s from 'joi-to-swagger';
import { validationHandler } from './handler.validation';

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

export const swSignupSchema = j2s(signupSchema).swagger;

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export const swLoginSchema = j2s(loginSchema).swagger;

export class authValidation {
  static async signupValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await validationHandler(signupSchema, req, res, next);
  }

  static async loginValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await validationHandler(loginSchema, req, res, next);
  }
}
