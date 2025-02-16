import {
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';

export const AUTHORS_ERRORS = {
  NOT_FOUND: new NotFoundException({
    id: 'AES-001',
    message: 'Autor não encontrado',
  }),

  FORBIDDEN_UPDATE: new ForbiddenException({
    id: 'AES-002',
    message: 'Você não tem permissão para editar este autor',
  }),

  FORBIDDEN_DELETE: new ForbiddenException({
    id: 'AES-003',
    message: 'Você não tem permissão para deletar este autor',
  }),
  DUPLICATE_NAME: new ConflictException({
    id: 'AES-004',
    message: 'Já existe um autor com este nome',
  }),
};
