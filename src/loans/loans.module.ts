import { Module } from '@nestjs/common';
import { LoansController } from './controllers/loans.controller';
import { LoansService } from './services/loans.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Books, BooksSchema } from '../books/schemas/book.entity';
import { Loans, LoansSchema } from './schemas/loan.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Loans.name, schema: LoansSchema },
      { name: Books.name, schema: BooksSchema },
    ]),
  ],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
