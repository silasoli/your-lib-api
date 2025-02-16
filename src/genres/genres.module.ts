import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Genres, GenresSchema } from './schemas/genre.entity';
import { AdminGenresService } from './services/admin-genres.service';
import { UserGenresService } from './services/user-genres.service';
import { AdminGenresController } from './controllers/admin-genres.controller';
import { UserGenresController } from './controllers/user-genres.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genres.name, schema: GenresSchema }]),
  ],
  controllers: [AdminGenresController, UserGenresController],
  providers: [AdminGenresService, UserGenresService],
})
export class GenresModule {}
