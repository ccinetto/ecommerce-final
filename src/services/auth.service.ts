import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUsuarioDoc } from '../models/usuario.model';
import Config from '../utils/config';
import { usuarioService } from './usuario.service';

// Implementando la mala praxis de guardar el jwt en memoria, pero mientras no desarrolle una mejor alternativa sigo con esta
// Un único usuario puede estar logeado en la app

// En el controller se guarda el token en req.app.locals.token

export class authService {
  // Genera y verifica el token jwt
  static async firmaToken(email: IUsuarioDoc['email']): Promise<string> {
    const usuario = await usuarioService.encuentraUsuarioPorEmail(email);
    console.log(usuario);
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
    return verificado;
  }
}
