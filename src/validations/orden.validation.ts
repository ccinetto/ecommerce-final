import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { validationHandler } from './handler.validation';

export class ordenValidation {
  static async finalizaOrdenValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const finalizaOrdenSchema = joi.object({
      orden_id: joi
        .string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({ 'string.pattern.base': `"" debe ser un id valido` })
        .required(),
    });
    await validationHandler(finalizaOrdenSchema, req, res, next);
  }
}
