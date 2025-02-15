import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../schemas/user.entity';

export class UserResponseDto {
  constructor(data: Users) {
    const { _id, name, email } = data;

    return { _id: String(_id as any), name, email };
  }

  @ApiProperty({ example: '61e53ad6b30b5b3b69f7a8e2' })
  _id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;
}
