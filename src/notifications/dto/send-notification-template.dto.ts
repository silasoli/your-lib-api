import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  // IsObject,
  IsOptional,
} from 'class-validator';

export class SendNotificationTemplateDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // template: string;

  // @ApiProperty()
  // @IsObject()
  // @IsNotEmpty()
  // variables: Record<string, any>;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  attachments?: { filename: string; content: Buffer; contentType: string }[];
}
