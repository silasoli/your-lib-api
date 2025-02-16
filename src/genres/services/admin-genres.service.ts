import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { GenreResponseDto } from '../dto/genre-response.dto';
import { GENRES_ERRORS } from '../constants/genres.errors';
import { Genres } from '../schemas/genre.entity';
import { UpdateGenreDto } from '../dto/update-genre.dto';

@Injectable()
export class AdminGenresService {
  constructor(
    @InjectModel(Genres.name)
    private genresModel: Model<Genres>,
  ) {}

  private async findByID(_id: string): Promise<Genres> {
    const genre = await this.genresModel.findOne({ _id, userId: null });

    if (!genre) throw GENRES_ERRORS.NOT_FOUND;

    return genre;
  }

  public async create(dto: CreateGenreDto): Promise<GenreResponseDto> {
    const exists = await this.genresModel.findOne({
      name: { $regex: `^${dto.name}$`, $options: 'i' },
      userId: null,
    });

    if (exists) throw GENRES_ERRORS.DUPLICATE_NAME;

    const created = await this.genresModel.create({ ...dto, userId: null });
    return new GenreResponseDto(created);
  }

  public async findAll(): Promise<GenreResponseDto[]> {
    const genres = await this.genresModel.find({ userId: null });
    return genres.map((genre) => new GenreResponseDto(genre));
  }

  public async findOne(_id: string): Promise<GenreResponseDto> {
    const genre = await this.findByID(_id);

    return new GenreResponseDto(genre);
  }

  public async update(
    _id: string,
    dto: UpdateGenreDto,
  ): Promise<GenreResponseDto> {
    await this.findByID(_id);

    if (dto.name) {
      const exists = await this.genresModel.findOne({
        name: { $regex: `^${dto.name}$`, $options: 'i' },
        userId: null,
        _id: { $ne: _id },
      });

      if (exists) throw GENRES_ERRORS.DUPLICATE_NAME;
    }

    await this.genresModel.updateOne({ _id }, dto);

    return this.findOne(_id);
  }

  public async remove(_id: string): Promise<void> {
    await this.findByID(_id);

    await this.genresModel.deleteOne({ _id });
  }
}
