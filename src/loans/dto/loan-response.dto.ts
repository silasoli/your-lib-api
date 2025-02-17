import { ApiProperty } from '@nestjs/swagger';
import { BookCondition } from '../../books/enums/book.enum';
import { Loans } from '../schemas/loan.entity';
import { LoanStatus } from '../enums/loan.enum';

export class LoanResponseDto {
  @ApiProperty({
    example: '615f4f9e9a1b9f1f7c9e8b9c',
    description: 'ID do empréstimo',
  })
  _id: string;

  @ApiProperty({
    example: '615f4f9e9a1b9f1f7c9e8b9c',
    description: 'ID do livro',
  })
  book: string;

  @ApiProperty({
    example: '615f4f9e9a1b9f1f7c9e8b9d',
    description: 'ID do usuário',
  })
  user: string;

  @ApiProperty({ example: 'João da Silva', description: 'Nome do solicitante' })
  borrowerName: string;

  @ApiProperty({
    example: 'joao@email.com',
    description: 'E-mail do solicitante',
  })
  borrowerEmail: string;

  @ApiProperty({
    example: '2024-02-16T12:00:00Z',
    description: 'Data do empréstimo',
  })
  loanDate: Date;

  @ApiProperty({
    example: '2024-03-16T12:00:00Z',
    description: 'Prazo de devolução',
  })
  dueDate: Date;

  @ApiProperty({
    example: '2024-03-15T12:00:00Z',
    description: 'Data de devolução',
    required: false,
  })
  returnDate?: Date;

  @ApiProperty({
    example: 'borrowed',
    enum: LoanStatus,
    description: 'Status do empréstimo',
  })
  status: LoanStatus;

  @ApiProperty({
    example: 'new',
    enum: BookCondition,
    description: 'Estado do livro antes do empréstimo',
  })
  bookConditionBefore: BookCondition;

  @ApiProperty({
    example: 'worn',
    enum: BookCondition,
    description: 'Estado do livro após o empréstimo',
    required: false,
  })
  bookConditionAfter?: BookCondition;

  @ApiProperty({
    example: 'Livro devolvido sem danos',
    description: 'Observações adicionais',
    required: false,
  })
  notes?: string;

  constructor(data: Loans) {
    this._id = String(data._id as string);
    this.book = String(data.book);
    this.user = String(data.user);
    this.borrowerName = data.borrowerName;
    this.borrowerEmail = data.borrowerEmail;
    this.loanDate = data.loanDate;
    this.dueDate = data.dueDate;
    this.returnDate = data.returnDate;
    this.status = data.status;
    this.bookConditionBefore = data.bookConditionBefore as BookCondition;
    this.bookConditionAfter = data.bookConditionAfter as BookCondition;
    this.notes = data.notes;
  }
}
