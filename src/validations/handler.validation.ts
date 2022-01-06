import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export const validationHandler = async (
  schema: ObjectSchema,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await schema.validateAsync(req.body, {
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
