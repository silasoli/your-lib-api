import { NotFoundException, BadRequestException } from '@nestjs/common';

export const LOANS_ERRORS = {
  NOT_FOUND: new NotFoundException({
    id: 'LNS-001',
    message: 'Empréstimo não encontrado',
  }),
  BOOK_ALREADY_BORROWED: new BadRequestException({
    id: 'LNS-002',
    message: 'O livro já está emprestado',
  }),
  BOOK_NOT_OWNED_BY_USER: new BadRequestException({
    id: 'LNS-003',
    message: 'Você só pode emprestar livros que pertencem a você',
  }),
};
