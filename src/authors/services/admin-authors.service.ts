import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorResponseDto } from '../dto/author-response.dto';
import { Authors, AuthorsDocument } from '../schemas/author.entity';
import { AUTHORS_ERRORS } from '../constants/authors.errors';

@Injectable()
export class AdminAuthorsService {
  constructor(
    @InjectModel(Authors.name)
    private authorsModel: Model<AuthorsDocument>,
  ) {}

  private async findByID(_id: string): Promise<Authors> {
    const author = await this.authorsModel.findOne({ _id, userId: null });

    if (!author) throw AUTHORS_ERRORS.NOT_FOUND;

    return author;
  }

  public async create(dto: CreateAuthorDto): Promise<AuthorResponseDto> {
    const created = await this.authorsModel.create({ ...dto, userId: null });

    return new AuthorResponseDto(created);
  }

  public async findAll(): Promise<AuthorResponseDto[]> {
    const authors = await this.authorsModel.find({ userId: null });

    return authors.map((item) => new AuthorResponseDto(item));
  }

  public async findOne(_id: string): Promise<AuthorResponseDto> {
    const author = await this.findByID(_id);

    return new AuthorResponseDto(author);
  }

  public async update(
    _id: string,
    dto: UpdateAuthorDto,
  ): Promise<AuthorResponseDto> {
    await this.findByID(_id);

    await this.authorsModel.updateOne({ _id }, dto);

    return this.findOne(_id);
  }

  public async remove(_id: string): Promise<void> {
    await this.findByID(_id);

    await this.authorsModel.deleteOne({ _id });
  }
}
