import { IMensaje, mensajeModel } from '../models/mensaje.model';

export class mensajeService {
  static async creaMensaje(payload: IMensaje): Promise<IMensaje> {
    const nuevo = await new mensajeModel({ ...payload });
    nuevo.save();
    return nuevo;
  }

  static async muestraMensajesDesdeAhora(
    momentoConexion: Date
  ): Promise<IMensaje[]> {
    const mensajes = await mensajeModel.find({
      createdAt: { $gte: momentoConexion },
    });
    return mensajes;
  }
}
