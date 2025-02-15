import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { LoginResponseDto } from '../dto/login-response.dto';

@ApiTags('Session')
@Controller('session')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Realizar login' })
  @ApiCreatedResponse({
    description: 'Autenticação de cliente criada com sucesso.',
    type: LoginResponseDto,
  })
  @ApiBody({ type: LoginDto })
  @Post('/login')
  public async create(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.auth(dto);
  }
}
