import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authSchema = request.headers['authorization']?.split(' ')[0] ?? ''; //-> Obtenemos el token del header de la petición, si no existe devolvemos un string vacío
    const token = request.headers['authorization']?.split(' ')[1] ?? ''; //-> Obtenemos el token del header de la petición, si no existe devolvemos un string vacío
    if (!token || authSchema !== 'Bearer') {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });
      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      request.user = payload;

      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
