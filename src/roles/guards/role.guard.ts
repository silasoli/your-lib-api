import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/roles.decorator';
import { RoleUtil } from '../utils/roles.util';
import { Roles } from '../enums/role.enum';
import { RequestWithUser } from '../../auth/interfaces/IUsers-request.interface';
import { AUTH_ERRORS } from '../../auth/constants/auth.errors';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleUtil: RoleUtil,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user._id) return false;

    const requiredActions = this.reflector.getAllAndOverride<Roles[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredActions) return true;

    const userid = String(user._id as any);

    const verify = await this.roleUtil.userHasRole(userid, requiredActions);

    if (!verify) throw AUTH_ERRORS.LACK_PERMISSION;

    return verify;
  }
}
