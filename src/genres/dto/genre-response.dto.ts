import { ApiProperty } from '@nestjs/swagger';
import { Genres } from '../schemas/genre.entity';

export class GenreResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  userId?: string;

  constructor(data: Genres) {
    this._id = String(data._id as string);
    this.name = data.name;
    this.description = data.description;
    this.userId = data.userId;
  }
}
