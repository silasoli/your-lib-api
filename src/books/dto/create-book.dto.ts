import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsString,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';
import { BookCondition } from '../enums/book.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    example: 'O Senhor dos Anéis',
    description: 'Título do livro',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: ['615f4f9e9a1b9f1f7c9e8b9d'],
    description: 'IDs dos autores',
    required: false,
  })
  @IsArray()
  @IsOptional()
  authors?: Types.ObjectId[];

  @ApiProperty({ example: 500, description: 'Número de páginas do livro' })
  @IsNumber()
  @IsNotEmpty()
  pages: number;

  @ApiProperty({
    example: ['615f4f9e9a1b9f1f7c9e8b9e'],
    description: 'IDs dos gêneros',
    required: false,
  })
  @IsArray()
  @IsOptional()
  genres?: Types.ObjectId[];

  // @ApiProperty({
  //   example: 'available',
  //   enum: BookStatus,
  //   description: 'Status do livro',
  // })
  // @IsEnum(BookStatus)
  // @IsNotEmpty()
  // status: BookStatus;

  @ApiProperty({
    example: 'good',
    enum: BookCondition,
    description: 'Condição do livro',
  })
  @IsEnum(BookCondition)
  @IsNotEmpty()
  condition: BookCondition;

  @ApiProperty({
    example: 'Um clássico da literatura.',
    description: 'Descrição do livro',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
