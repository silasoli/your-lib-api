import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthUserJwtStrategy } from './strategies/auth-user-jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('USER_SECRET');
        const expiresIn = configService.get<string>('USER_EXPIRESIN');
        return {
          secret,
          signOptions: { expiresIn: expiresIn || '1d' },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthUserJwtStrategy],
})
export class AuthModule {}
