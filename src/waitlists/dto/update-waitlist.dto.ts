import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateWaitlistDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  borrowerName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  borrowerEmail?: string;
}
