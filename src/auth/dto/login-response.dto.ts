import { ApiProperty } from '@nestjs/swagger';
import { ILoginPayload } from '../interfaces/IPayload.interface';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginResponseDto {
  constructor(user: ILoginPayload) {
    const { id, name, email, access_token } = user;

    return { id: String(id as string), name, email, access_token };
  }

  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty({ message: 'É necessário informar o email do usuário.' })
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'É necessário informar o email do usuário.' })
  @IsEmail({}, { message: 'O email informado deve ser válido' })
  email: string;

  @ApiProperty({ required: true })
  access_token: string;
}
