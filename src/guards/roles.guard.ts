import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../modules/Auth/enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      //* Estos métodos se usan para extrar la información de la metadata. Proviene del RoleDecorator
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = requiredRoles.some((role) => user.role.includes(role));
    console.log('hasRole', hasRole);

    if (
      user.role.includes(Role.Admin) ||
      (hasRole && request.params.id === user.id)
    ) {
      return true;
    } else {
      throw new ForbiddenException(
        'You do not have permission to access this route',
      );
    }
  }
}
