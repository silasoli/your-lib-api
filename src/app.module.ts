import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { RolesModule } from './roles/roles.module';
import { GenresModule } from './genres/genres.module';
import { NotificationsModule } from './notifications/notifications.module';
import { BooksModule } from './books/books.module';
import { LoansModule } from './loans/loans.module';
import { WaitlistsModule } from './waitlists/waitlists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    AuthModule,
    RolesModule,
    UsersModule,
    AuthorsModule,
    GenresModule,
    NotificationsModule,
    BooksModule,
    LoansModule,
    WaitlistsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
