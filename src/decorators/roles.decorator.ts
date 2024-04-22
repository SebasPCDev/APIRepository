import { SetMetadata } from '@nestjs/common';
import { Role } from '../modules/Auth/enum/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
