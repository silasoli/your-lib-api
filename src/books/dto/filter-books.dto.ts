import { IsOptional, IsString, IsArray } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class FilterBooksDto {
  @ApiProperty({
    example: 'O Senhor dos Anéis',
    description: 'Título do livro para busca',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: ['615f4f9e9a1b9f1f7c9e8b9d'],
    description: 'IDs dos autores para busca',
    required: false,
  })
  @IsArray()
  @IsOptional()
  authors?: Types.ObjectId[];

  @ApiProperty({
    example: ['615f4f9e9a1b9f1f7c9e8b9e'],
    description: 'IDs dos gêneros para busca',
    required: false,
  })
  @IsArray()
  @IsOptional()
  genres?: Types.ObjectId[];
}
