import { ApiProperty } from '@nestjs/swagger';
import { BookStatus, BookCondition } from '../enums/book.enum';
import { Books } from '../schemas/book.entity';

export class BookResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  authors: string[];

  @ApiProperty()
  pages: number;

  @ApiProperty()
  genres: string[];

  @ApiProperty()
  status: BookStatus;

  @ApiProperty()
  condition: BookCondition;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(data: Books) {
    this._id = String(data._id as string);
    this.title = data.title;
    this.authors = data.authors?.map(String) || [];
    this.pages = data.pages;
    this.genres = data.genres?.map(String) || [];
    this.status = data.status as BookStatus;
    this.condition = data.condition as BookCondition;
    this.description = data.description;
  }
}
