import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { BookCondition } from '../../books/enums/book.enum';
import { LoanStatus } from '../enums/loan.enum';

export class UpdateLoanDto {
  @ApiProperty({
    example: 'returned',
    enum: LoanStatus,
    description: 'Status do empréstimo',
  })
  @IsEnum(LoanStatus)
  @IsNotEmpty()
  status: LoanStatus;

  @ApiProperty({
    example: '2024-03-15T12:00:00Z',
    description: 'Data de devolução',
    required: false,
  })
  @IsDate()
  @IsOptional()
  returnDate?: Date;

  @ApiProperty({
    example: 'worn',
    enum: BookCondition,
    description: 'Estado do livro após o empréstimo',
    required: false,
  })
  @IsEnum(BookCondition)
  @IsOptional()
  bookConditionAfter?: BookCondition;
}
