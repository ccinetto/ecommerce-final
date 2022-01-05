import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUsuario } from '../models/usuario.model';
import Config from '../utils/config';
import { usuarioService } from './usuario.service';

// En el controller se guarda el token en req.app.locals.token

export class authService {
  // Genera y verifica el token jwt en el token va el id del ususario, su mail y un booleano que indica si es administrador
  // El no ser admin restringe el acceso a ciertos endpoints
  // La parte secreta del token está en las variables de entorno .env
  static async firmaToken(email: IUsuario['email']): Promise<string> {
    const usuario = await usuarioService.encuentraUsuarioPorEmail(email);
    const token = jwt.sign(
      {
        _id: usuario!._id,
        email: usuario!.email,
        admin: usuario!.admin,
      },
      Config.jwt_secret!,
      {
        expiresIn: Config.session_duration_seconds,
      }
    );
    return token;
  }

  // Con esta función se verifica el token suministrado,
  // En caso de ser valido de regenera el objeto con la info que se codifico en la firma
  // La parte secreta del token está en las variables de entorno .env
  static async verificaToken(token: string): Promise<JwtPayload | string> {
    const verificado = jwt.verify(token, Config.jwt_secret!);
    return verificado;
  }
}
