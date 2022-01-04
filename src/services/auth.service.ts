import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUsuario } from '../models/usuario.model';
import Config from '../utils/config';
import { usuarioService } from './usuario.service';

// En el controller se guarda el token en req.app.locals.token

export class authService {
  // Genera y verifica el token jwt
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

  static async verificaToken(token: string): Promise<JwtPayload | string> {
    const verificado = jwt.verify(token, Config.jwt_secret!);
    // console.log(verificado);
    return verificado;
  }
}
