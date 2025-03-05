import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { $Enums } from '@prisma/client';
import { CustomRequest } from 'src/interfaces/custom-request.interface';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<
      $Enums.UserRoleEnum[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true; // If there are no roles required, allow access
    }

    const { user } = context.switchToHttp().getRequest<CustomRequest>();

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
