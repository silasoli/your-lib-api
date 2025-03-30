import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorResponseDto } from '../dto/author-response.dto';
import { AUTHORS_ERRORS } from '../constants/authors.errors';
import { Authors, AuthorsDocument } from '../schemas/author.entity';

@Injectable()
export class UserAuthorsService {
  constructor(
    @InjectModel(Authors.name)
    private authorsModel: Model<AuthorsDocument>,
  ) {}

  private async findByID(_id: string, userId: string): Promise<Authors> {
    const author = await this.authorsModel.findOne({ _id, userId });
    if (!author) throw AUTHORS_ERRORS.NOT_FOUND;
    return author;
  }

  public async create(
    userId: string,
    dto: CreateAuthorDto,
  ): Promise<AuthorResponseDto> {
    const exists = await this.authorsModel.findOne({
      name: { $regex: `^${dto.name}$`, $options: 'i' },
      $or: [{ userId: null }, { userId }],
    });

    if (exists) throw AUTHORS_ERRORS.DUPLICATE_NAME;

    const created = await this.authorsModel.create({ ...dto, userId });
    return new AuthorResponseDto(created);
  }

  public async findUserAuthors(userId: string): Promise<AuthorResponseDto[]> {
    const authors = await this.authorsModel.find({
      $or: [{ userId }, { userId: null }],
    });

    return authors.map((item) => new AuthorResponseDto(item));
  }

  public async findOne(
    _id: string,
    userId: string,
  ): Promise<AuthorResponseDto> {
    const author = await this.authorsModel.findOne({
      _id,
      $or: [{ userId }, { userId: null }],
    });

    if (!author) throw AUTHORS_ERRORS.NOT_FOUND;

    return new AuthorResponseDto(author);
  }

  public async update(
    _id: string,
    userId: string,
    dto: UpdateAuthorDto,
  ): Promise<AuthorResponseDto> {
    await this.findByID(_id, userId);

    if (dto.name) {
      const exists = await this.authorsModel.findOne({
        name: { $regex: `^${dto.name}$`, $options: 'i' },
        $or: [{ userId: null }, { userId }],
        _id: { $ne: _id },
      });

      if (exists) throw AUTHORS_ERRORS.DUPLICATE_NAME;
    }

    await this.authorsModel.updateOne({ _id }, dto);
    return this.findOne(_id, userId);
  }

  public async remove(_id: string, userId: string): Promise<void> {
    await this.findByID(_id, userId);
    await this.authorsModel.deleteOne({ _id });
  }
}
