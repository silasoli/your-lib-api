import { NotFoundException } from '@nestjs/common';

export const USERS_ERRORS = {
  NOT_FOUND: new NotFoundException({
    id: 'UES-001',
    message: 'Usuário não encontrado',
  }),
};
