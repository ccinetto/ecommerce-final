export interface IUsuario {
  _id: string;
  nombre: string;
  email: string;
  telefono: string;
  password: string;
  admin: boolean;
}

export interface IUsuarioNuevo {
  nombre: string;
  email: string;
  telefono: string;
  password: string;
  admin: boolean;
}

export interface BaseClassUsuario {
  add(data: IUsuarioNuevo): Promise<IUsuario>;
  update(id: string, dataUsuario: IUsuarioNuevo): Promise<IUsuario | null>;
  delete(id: string): Promise<void>;
}
