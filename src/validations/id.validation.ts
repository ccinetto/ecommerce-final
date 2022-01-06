import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { validationHandler } from './handler.validation';

export const idValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idSchema = joi
    .string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({ 'string.pattern.base': `"" debe ser un id valido` })
    .required();
  try {
    const value = await idSchema.validateAsync(req.params.id, {
      abortEarly: false,
    });
    next();
  } catch (error: any) {
    let errorMessage = '';
    for (const err of error.details) {
      errorMessage +=
        // ' [ ' +
        err.path.join(' > ') +
        err.message.slice(err.message.lastIndexOf('"') + 1) +
        ', ';
    }
    res.status(400).json({ err: errorMessage });
  }
};
