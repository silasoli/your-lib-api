import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateWaitlistDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  bookId: string;

  @ApiProperty()
  @IsNotEmpty()
  borrowerName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  borrowerEmail: string;
}
