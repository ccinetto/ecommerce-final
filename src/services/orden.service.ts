import { IOrden, ordenModel } from '../models/orden.model';

export class ordenService {
  // Crud
  static async creaOrden(payload: IOrden): Promise<IOrden> {
    const nuevaOrden = new ordenModel({ ...payload });
    nuevaOrden.save();
    return nuevaOrden;
  }

  //   cRud
  static async listaOrdenesTodas(): Promise<IOrden[]> {
    const todos = await ordenModel.find({});
    return todos;
  }

  static async listaOrdenPorId(orden_id: string): Promise<IOrden | null> {
    const uno = await ordenModel.findOne({ _id: orden_id });
    return uno;
  }

  //   crUd
  static async finalizaOrden(orden_id: string): Promise<IOrden> {
    const aCompletar = await ordenModel.findOneAndUpdate(
      { _id: orden_id },
      { estado: 'finalizado' },
      { new: true }
    );
    return aCompletar!;
  }

  //   Utils
  static async ordenExiste(orden_id: string): Promise<boolean> {
    const existe = await ordenModel.findOne({ _id: orden_id });
    if (!existe) {
      return false;
    }
    return true;
  }

  static async ordenGenerada(orden_id: string): Promise<boolean> {
    const orden = await ordenModel.findOne({ _id: orden_id });
    const generada = orden!.estado === 'generado';
    if (!generada) {
      return false;
    }
    return true;
  }
}
