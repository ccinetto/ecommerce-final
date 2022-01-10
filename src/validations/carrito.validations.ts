import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import j2s from 'joi-to-swagger';
import { validationHandler } from './handler.validation';

const agregaACarritoSchema = joi.object({
  producto_id: joi
    .string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({ 'string.pattern.base': `"" debe ser un id valido` })
    .required(),
  cantidad: joi.number().greater(0).integer().required(),
});

export const swAgregaACarritoSchema = j2s(agregaACarritoSchema).swagger;

const checkoutSchema = joi.object({
  calle: joi.string().required(),
  altura: joi.string().required(),
  zipcode: joi.string().required(),
  piso: joi.string(),
  departamento: joi.string(),
});

export const swCheckoutSchema = j2s(checkoutSchema).swagger;

export class carritoValidation {
  static async agregaACarritoValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await validationHandler(agregaACarritoSchema, req, res, next);
  }

  static async checkoutValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await validationHandler(checkoutSchema, req, res, next);
  }
}
