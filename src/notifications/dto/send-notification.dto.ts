import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

export class SendNotificationDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  attachments?: { filename: string; content: Buffer; contentType: string }[];
}
