import { Request, Response, NextFunction } from 'express';
import { ILogin, IUsuario } from '../models/usuario.model';
import { authService } from '../services/auth.service';
import { carritoService } from '../services/carrito.service';
import { usuarioService } from '../services/usuario.service';

export class authController {
  // Se registra el usuario
  // La informacion se debe suministrar en el body con los siguientes campos
  // - nombre
  // - email
  // - telefono
  // - password
  // - admin
  // Si se genera exitosamente se crea el usuario en la coleccion,
  // Se crea el carrito correspondiente al usuario
  // Y emite un status 201
  // Si falla genera un 400
  static async signupUsuario(req: Request, res: Response) {
    const entrada: IUsuario = req.body;
    const nuevoUsuario: IUsuario = await usuarioService.creaUsuario(entrada);
    if (nuevoUsuario) {
      await carritoService.creaCarrito(nuevoUsuario._id);
      res.status(201).json({
        msg: `Usuario ${nuevoUsuario.email} agregado exitosamente.`,
      });
    } else {
      res.status(400).json({ msg: `Fallo al registrar usuario` });
    }
  }

  // Se logea el usuario
  // Requiere un body con:
  // - email
  // - password
  // Si es exitoso genera un token firmado que se guarda en:
  // req.app.locals.token para usarlo en el backend
  // para el front se encia como un header llamado auth-token
  // Si falla el login emite un 400
  static async loginUsuario(req: Request, res: Response) {
    const entrada: ILogin = req.body;
    const autorizado = await usuarioService.autorizadoPorEmail(
      entrada.email,
      entrada.password
    );
    if (autorizado) {
      const token = await authService.firmaToken(entrada.email);
      req.app.locals.token = token;
      res
        .header('auth-token', token)
        .status(201)
        .json({ msg: `Bienvenido ${entrada.email}` });
    } else {
      res.status(401).json({ msg: `No estás autorizado` });
    }
  }

  // Se desconecta el usuario y se borra el token asociado (lu vuelvo un string vacio)
  static async logoutUsuario(req: Request, res: Response, next: NextFunction) {
    req.app.locals.token = '';
    res.json({ msg: `Usuario deslogueado` });
  }

  // Este middleware es la columna vertebral del sistema, se usa para todas los endpoints
  // salvo aquellos de autenticacion /signup, /login, /logout
  // Se busca el token en req.app.locals si no existe corto operacion y solicito se logueen
  // Si el token existe se verifica y se continua con next, de existir algun error se indica que el token no es valido
  // El token verificado se guarda en res.locals.verified para ser usado por los siguientes controladores en la ruta
  static async verificaTokenMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = req.app.locals.token;
    if (!token)
      return res
        .status(401)
        .json({ error: 'Acceso denegado, por favor inicia sesion' });
    try {
      const verified = await authService.verificaToken(token);
      res.locals.verified = verified;
      next(); // continuamos
    } catch (error) {
      res.status(400).json({ error: 'token no es válido' });
    }
  }

  // Verifica que el token verificado tenga privilegios de administrador
  // Corta la ejecucion de no ser asi
  static async adminOnly(req: Request, res: Response, next: NextFunction) {
    if (res.locals.verified.admin) {
      next();
    } else {
      return res.status(401).json({ error: 'No estás autorizado' });
    }
  }

  // Verifica que exista un body al momento de llamar al endpoint
  // Corta la ejecucion de no ser asi
  static async checkForBody(req: Request, res: Response, next: NextFunction) {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ msg: 'Por favor suministra los datos solicitados' });
    }
    next();
  }
}
