import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDate,
  IsString,
  IsEmail,
} from 'class-validator';
import { BookCondition } from '../../books/enums/book.enum';

export class CreateLoanDto {
  @ApiProperty({
    example: '615f4f9e9a1b9f1f7c9e8b9c',
    description: 'ID do livro',
  })
  @IsNotEmpty()
  book: string;

  @ApiProperty({ example: 'João da Silva', description: 'Nome do solicitante' })
  @IsString()
  @IsNotEmpty()
  borrowerName: string;

  @ApiProperty({
    example: 'joao@email.com',
    description: 'E-mail do solicitante',
  })
  @IsEmail()
  @IsNotEmpty()
  borrowerEmail: string;

  @ApiProperty({
    example: '2024-02-16T12:00:00Z',
    description: 'Data do empréstimo',
  })
  @IsDate()
  @IsNotEmpty()
  loanDate: Date;

  @ApiProperty({
    example: '2024-03-16T12:00:00Z',
    description: 'Prazo de devolução',
  })
  @IsDate()
  @IsNotEmpty()
  dueDate: Date;

  @ApiProperty({
    example: 'new',
    enum: BookCondition,
    description: 'Estado do livro antes do empréstimo',
  })
  @IsEnum(BookCondition)
  @IsNotEmpty()
  bookConditionBefore: BookCondition;

  @ApiProperty({
    example: 'Livro em bom estado',
    description: 'Observações adicionais',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
