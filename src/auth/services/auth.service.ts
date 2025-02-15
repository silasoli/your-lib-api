import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { ILogin } from '../interfaces/ILogin.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from '../dto/login-response.dto';
import { UsersService } from '../../users/services/users.service';
import { AUTH_ERRORS } from '../constants/auth.errors';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private async validate(dto: LoginDto): Promise<ILogin | null> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) return null;

    const passMatch = await this.usersService.comparePass(
      dto.password,
      user.password,
    );

    if (!passMatch) return null;

    return { _id: user._id, email: user.email, name: user.name };
  }

  private sign(user: ILogin): LoginResponseDto {
    const { _id, name, email } = user;
    const payload = { email, sub: _id };
    return new LoginResponseDto({
      id: _id,
      email,
      name,
      access_token: this.jwtService.sign(payload),
    });
  }

  public async auth(dto: LoginDto): Promise<LoginResponseDto> {
    const isValidUser = await this.validate(dto);
    if (!isValidUser) throw AUTH_ERRORS.INVALID_CREDENTIALS;
    return this.sign(isValidUser);
  }

  public async decodeAccessToken<T extends object>(
    accessToken: string,
  ): Promise<T> {
    return this.jwtService.verifyAsync(accessToken);
  }
}
