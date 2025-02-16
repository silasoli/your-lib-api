import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  //   @IsOptional()
  //   @IsDate()
  //   birthDate?: Date;

  //   @IsOptional()
  //   @IsString()
  //   nationality?: string;
}
