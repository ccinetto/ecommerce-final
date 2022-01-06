import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

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
        // .pattern(/^(?:00|\\+)[0-9\\s.\\/-]{6,20}$/)
        .required(),
      password: joi.string().min(6).required(),
      admin: joi.boolean().required(),
    });
    const { error } = signupSchema.validate({ ...req.body });
    if (error) {
      switch (error.details[0].context!.key) {
        case 'nombre':
          res.status(400).json({ message: error.details[0].message });
          break;
        case 'email':
          res.status(400).json({ message: error.details[0].message });
          break;
        case 'telefono':
          res.status(400).json({ message: error.details[0].message });
          break;
        case 'password':
          res.status(400).json({ message: error.details[0].message });
          break;
        case 'admin':
          res.status(400).json({ message: error.details[0].message });
          break;
        default:
          res.status(500).json({ message: 'An error occurred.' });
          break;
      }
      //   return res.status(400).json({ msg: 'Algo malio sal' });
    }
    next();
  }
}
