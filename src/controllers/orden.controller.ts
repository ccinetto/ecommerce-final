import { NextFunction, Request, Response } from 'express';
import { ordenService } from '../services/orden.service';

export class ordenController {
  // Middleware que detiene la ejecucion si el orden con el id indicado en el body no existe
  static async paraSiNoExisteLaOrden(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const orden_id = req.body.orden_id;
    const existe = await ordenService.ordenExiste(orden_id);
    if (!existe) {
      res.status(400).json({ mgs: 'No existe la orden' });
    }
    next();
  }
  // Detiene la ejecucion si el estado de la orden es distinto a generado
  // El id de la orden esta en el body
  static async paraSiNoGenerada(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const orden_id = req.body.orden_id;
    const generada = await ordenService.ordenGenerada(orden_id);
    if (!generada) {
      res.status(400).json({ mgs: 'El estado de la orden no es generado' });
    }
    next();
  }

  // Cambia el estadod e la orden a finalizado
  // El id de la orden esta en el body
  static async finalizaOrden(req: Request, res: Response) {
    const orden_id = req.body.orden_id;
    const finalizada = await ordenService.finalizaOrden(orden_id);
    res.status(200).json({ msg: finalizada });
  }

  static async listaTodasLasOrdenes(req: Request, res: Response) {
    const todas = await ordenService.listaOrdenesTodas();
    res.status(200).json({ ordenes: todas });
  }

  static async listaUnaOrden(req: Request, res: Response) {
    const id = req.params.id;
    const una = await ordenService.listaOrdenPorId(id);
    if (!una) {
      res.status(400).json({ msg: `Orden ${id} no encontrada` });
    }
    res.status(200).json({ orden: una });
  }
}
