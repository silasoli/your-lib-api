import { NotFoundException } from '@nestjs/common';

export const BOOKS_ERRORS = {
  NOT_FOUND: new NotFoundException({
    id: 'BKS-001',
    message: 'Livro não encontrado',
  }),
};
