import { UnauthorizedException } from '@nestjs/common';

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: new UnauthorizedException({
    id: 'AUTH-001',
    message: 'Credenciais inválidas.',
  }),
  LACK_PERMISSION: new UnauthorizedException({
    id: 'AUTH-002',
    message: 'Usuário não tem permissão.',
  }),
};
