import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Books, BooksDocument } from '../../books/schemas/book.entity';
import { CreateLoanDto } from '../dto/create-loan.dto';
import { LoanResponseDto } from '../dto/loan-response.dto';
import { UpdateLoanDto } from '../dto/update-loan.dto';
import { LoanStatus } from '../enums/loan.enum';
import { Loans, LoansDocument } from '../schemas/loan.entity';
import { LOANS_ERRORS } from '../constants/loans.errors';
import { BookStatus } from '../../books/enums/book.enum';

@Injectable()
export class LoansService {
  constructor(
    @InjectModel(Loans.name)
    private readonly loanModel: Model<LoansDocument>,
    @InjectModel(Books.name)
    private readonly booksModel: Model<BooksDocument>,
  ) {}

  private async validateBookOwnership(bookId: string, userId: string) {
    const book = await this.booksModel.findOne({ _id: bookId, userId });
    if (!book) throw LOANS_ERRORS.BOOK_NOT_OWNED_BY_USER;
  }

  // public async create(
  //   userId: string,
  //   dto: CreateLoanDto,
  // ): Promise<LoanResponseDto> {
  //   await this.validateBookOwnership(dto.book, userId);
  //   const existingLoan = await this.loanModel.findOne({
  //     book: dto.book,
  //     status: LoanStatus.BORROWED,
  //   });
  //   if (existingLoan) throw LOANS_ERRORS.BOOK_ALREADY_BORROWED;

  //   const loan = await this.loanModel.create({ ...dto, user: userId });
  //   return new LoanResponseDto(loan);
  //   //adicionar update na tabela de livros para quando um loan for criado tornar esse livro com status emprestado
  // }

  public async create(
    userId: string,
    dto: CreateLoanDto,
  ): Promise<LoanResponseDto> {
    await this.validateBookOwnership(dto.book, userId);

    const existingLoan = await this.loanModel.findOne({
      book: dto.book,
      status: LoanStatus.BORROWED,
    });

    if (existingLoan) throw LOANS_ERRORS.BOOK_ALREADY_BORROWED;

    const loan = await this.loanModel.create({ ...dto, user: userId });

    // Atualiza o status do livro para emprestado
    await this.booksModel.findOneAndUpdate(
      { _id: dto.book },
      {
        status: BookStatus.BORROWED,
      },
    );

    return new LoanResponseDto(loan);
  }

  public async findAllActive(userId: string): Promise<LoanResponseDto[]> {
    const loans = await this.loanModel.find({
      status: LoanStatus.BORROWED,
      user: userId,
    });
    return loans.map((loan) => new LoanResponseDto(loan));
  }

  public async findHistory(userId: string): Promise<LoanResponseDto[]> {
    const loans = await this.loanModel.find({
      user: userId,
      status: { $in: [LoanStatus.RETURNED, LoanStatus.OVERDUE] },
    });
    return loans.map((loan) => new LoanResponseDto(loan));
  }

  public async findOne(id: string, userId: string): Promise<LoanResponseDto> {
    const loan = await this.loanModel.findOne({ _id: id, user: userId });
    if (!loan) throw LOANS_ERRORS.NOT_FOUND;
    return new LoanResponseDto(loan);
  }

  public async update(
    id: string,
    userId: string,
    dto: UpdateLoanDto,
  ): Promise<LoanResponseDto> {
    await this.findOne(id, userId);
    const rawData = { ...dto };

    if (dto.status === LoanStatus.RETURNED) {
      rawData.returnDate = new Date();
    }

    await this.loanModel.updateOne({ _id: id, user: userId }, rawData);
    return this.findOne(id, userId);
  }

  public async remove(id: string, userId: string): Promise<void> {
    const loan = await this.findOne(id, userId);
    await this.loanModel.deleteOne({ _id: loan._id, user: userId });
  }
}
