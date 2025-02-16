import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { FilterBooksDto } from '../dto/filter-books.dto';
import { BookResponseDto } from '../dto/book-response.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthUserJwtGuard } from '../../auth/guards/auth-user-jwt.guard';
import { Role } from '../../roles/decorators/roles.decorator';
import { Roles } from '../../roles/enums/role.enum';
import { RoleGuard } from '../../roles/guards/role.guard';
import { UserRequest } from '../../auth/decorators/user-request.decorator';
import { UserRequestDTO } from '../../auth/dto/user-request.dto';
import { IDMongoQueryDTO } from '../../common/dto/id-mongo-query.dto';

@ApiBearerAuth()
@ApiTags('Books - User')
@Controller('users/books')
@UseGuards(AuthUserJwtGuard, RoleGuard)
@Role([Roles.USER])
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @ApiOperation({ summary: 'Criar um livro vinculado ao usuário' })
  @ApiCreatedResponse({
    description: 'Livro criado com sucesso',
    type: BookResponseDto,
  })
  @Post()
  async create(
    @UserRequest() user: UserRequestDTO,
    @Body() dto: CreateBookDto,
  ): Promise<BookResponseDto> {
    return this.booksService.create(user._id, dto);
  }

  @ApiOperation({ summary: 'Listar livros do usuário com filtros' })
  @ApiOkResponse({
    description: 'Lista de livros do usuário retornada com sucesso',
    type: [BookResponseDto],
  })
  @Get()
  async findUserBooks(
    @UserRequest() user: UserRequestDTO,
    @Query() filters: FilterBooksDto,
  ): Promise<BookResponseDto[]> {
    return this.booksService.findAll(user._id, filters);
  }

  @ApiOperation({ summary: 'Obter detalhes de um livro do usuário' })
  @ApiOkResponse({
    description: 'Livro encontrado com sucesso',
    type: BookResponseDto,
  })
  @Get(':id')
  async findOne(
    @Param() params: IDMongoQueryDTO,
    @UserRequest() user: UserRequestDTO,
  ): Promise<BookResponseDto> {
    return this.booksService.findOne(params.id, user._id);
  }

  @ApiOperation({ summary: 'Atualizar um livro do usuário' })
  @ApiOkResponse({
    description: 'Livro atualizado com sucesso',
    type: BookResponseDto,
  })
  @Patch(':id')
  async update(
    @Param() params: IDMongoQueryDTO,
    @UserRequest() user: UserRequestDTO,
    @Body() dto: UpdateBookDto,
  ): Promise<BookResponseDto> {
    return this.booksService.update(params.id, user._id, dto);
  }

  // @ApiOperation({ summary: 'Deletar um livro do usuário' })
  // @ApiNoContentResponse({ description: 'Livro removido com sucesso' })
  // @HttpCode(204)
  // @Delete(':id')
  // async remove(
  //   @Param() params: IDMongoQueryDTO,
  //   @UserRequest() user: UserRequestDTO,
  // ): Promise<void> {
  //   return this.booksService.remove(params.id, user._id);
  // }
}
