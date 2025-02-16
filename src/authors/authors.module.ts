import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminAuthorsService } from './services/admin-authors.service';
import { UserAuthorsService } from './services/user-authors.service';
import { AdminAuthorsController } from './controllers/admin-authors.controller';
import { UserAuthorsController } from './controllers/user-authors.controller';
import { Authors, AuthorsSchema } from './schemas/author.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Authors.name, schema: AuthorsSchema }]),
  ],
  controllers: [AdminAuthorsController, UserAuthorsController],
  providers: [AdminAuthorsService, UserAuthorsService],
})
export class AuthorsModule {}
