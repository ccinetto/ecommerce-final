import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import j2s from 'joi-to-swagger';
import { validationHandler } from './handler.validation';

const finalizaOrdenSchema = joi.object({
  orden_id: joi
    .string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({ 'string.pattern.base': `"" debe ser un id valido` })
    .required(),
});

export const swFinalizaOrdenSchema = j2s(finalizaOrdenSchema).swagger;

export class ordenValidation {
  static async finalizaOrdenValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await validationHandler(finalizaOrdenSchema, req, res, next);
  }
}
