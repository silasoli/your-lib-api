import { NotFoundException, ConflictException } from '@nestjs/common';

export const GENRES_ERRORS = {
  NOT_FOUND: new NotFoundException({
    id: 'GES-001',
    message: 'Gênero não encontrado',
  }),

  DUPLICATE_NAME: new ConflictException({
    id: 'GES-002',
    message: 'Já existe um gênero com este nome',
  }),
};
