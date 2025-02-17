import { BadRequestException, NotFoundException } from '@nestjs/common';

export const WAITLIST_ERRORS = {
  NOT_FOUND: new NotFoundException({
    id: 'WLE-001',
    message: 'Entrada na fila de espera não encontrada.',
  }),

  BOOK_NOT_FOUND: new NotFoundException({
    id: 'WLE-002',
    message: 'Livro não encontrado.',
  }),

  BOOK_OWNED_BY_USER: new BadRequestException({
    id: 'WLE-003',
    message:
      'Você não pode adicionar à fila de espera um livro que você mesmo cadastrou.',
  }),

  MAX_WAITLIST_REACHED: new BadRequestException({
    id: 'WLE-004',
    message:
      'A fila de espera para este livro já atingiu o limite máximo de 5 pessoas.',
  }),
};
