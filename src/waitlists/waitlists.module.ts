import { Module } from '@nestjs/common';
import { WaitlistsService } from './services/waitlists.service';
import { WaitlistsController } from './controllers/waitlists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Books, BooksSchema } from '../books/schemas/book.entity';
import { Waitlists, WaitlistsSchema } from './schemas/waitlist.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Waitlists.name, schema: WaitlistsSchema },
      { name: Books.name, schema: BooksSchema },
    ]),
  ],
  controllers: [WaitlistsController],
  providers: [WaitlistsService],
})
export class WaitlistsModule {}
