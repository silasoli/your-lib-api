import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Books, BooksDocument } from '../schemas/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { FilterBooksDto } from '../dto/filter-books.dto';
import { BookResponseDto } from '../dto/book-response.dto';
import { BOOKS_ERRORS } from '../constants/books.errors';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books.name)
    private readonly booksModel: Model<BooksDocument>,
  ) {}

  public async create(
    userId: string,
    dto: CreateBookDto,
  ): Promise<BookResponseDto> {
    const createdBook = await this.booksModel.create({ ...dto, userId });
    return new BookResponseDto(createdBook);
  }

  public async findAll(
    userId: string,
    filters: FilterBooksDto,
  ): Promise<BookResponseDto[]> {
    const query: FilterQuery<Books> = { userId };

    if (filters.title) query.title = { $regex: filters.title, $options: 'i' };
    if (filters.authors) query.authors = { $in: filters.authors };
    if (filters.genres) query.genres = { $in: filters.genres };

    const books = await this.booksModel.find(query);

    return books.map((book) => new BookResponseDto(book));
  }

  public async findOne(id: string, userId: string): Promise<BookResponseDto> {
    const book = await this.booksModel.findOne({ _id: id, userId });
    if (!book) throw BOOKS_ERRORS.NOT_FOUND;
    return new BookResponseDto(book);
  }

  public async update(
    id: string,
    userId: string,
    dto: UpdateBookDto,
  ): Promise<BookResponseDto> {
    await this.findOne(id, userId);
    await this.booksModel.updateOne({ _id: id, userId }, dto);
    return this.findOne(id, userId);
  }

  public async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.booksModel.deleteOne({ _id: id, userId });
  }
}
