import { ApiProperty } from '@nestjs/swagger';
import { Authors } from '../schemas/author.entity';

export class AuthorResponseDto {
  constructor(data: Authors) {
    const { _id, name, bio, userId } = data;

    return { _id: String(_id as string), name, bio, userId };
  }

  @ApiProperty({ example: '61e53ad6b30b5b3b69f7a8e2' })
  _id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: '' })
  bio?: string;

  @ApiProperty({ example: '61e53ad6b30b5b3b69f7a8e2' })
  userId?: string;
}
