import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { AuthUserJwtGuard } from '../../auth/guards/auth-user-jwt.guard';
import { Roles } from '../../roles/enums/role.enum';
import { RoleGuard } from '../../roles/guards/role.guard';
import { GenreResponseDto } from '../dto/genre-response.dto';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';
import { Role } from '../../roles/decorators/roles.decorator';
import { UserGenresService } from '../services/user-genres.service';
import { UserRequest } from '../../auth/decorators/user-request.decorator';
import { UserRequestDTO } from '../../auth/dto/user-request.dto';
import { IDMongoQueryDTO } from '../../common/dto/id-mongo-query.dto';

@ApiBearerAuth()
@ApiTags('Genres - User')
@Controller('users/genres')
@UseGuards(AuthUserJwtGuard, RoleGuard)
@Role([Roles.USER])
export class UserGenresController {
  constructor(private readonly userGenresService: UserGenresService) {}

  @ApiOperation({ summary: 'Criar um gênero privado (vinculado ao usuário)' })
  @ApiCreatedResponse({
    description: 'Gênero criado com sucesso',
    type: GenreResponseDto,
  })
  @Post()
  async create(
    @UserRequest() user: UserRequestDTO,
    @Body() dto: CreateGenreDto,
  ) {
    return this.userGenresService.create(user._id, dto);
  }

  @ApiOperation({ summary: 'Obter gêneros criados pelo usuário' })
  @ApiOkResponse({
    description: 'Lista de gêneros do usuário retornada',
    type: [GenreResponseDto],
  })
  @Get()
  async findUserGenres(@UserRequest() user: UserRequestDTO) {
    return this.userGenresService.findUserGenres(user._id);
  }

  @ApiOperation({ summary: 'Obter um gênero do usuário' })
  @ApiOkResponse({ description: 'Gênero encontrado', type: GenreResponseDto })
  @Get(':id')
  async findOne(
    @Param() params: IDMongoQueryDTO,
    @UserRequest() user: UserRequestDTO,
  ) {
    return this.userGenresService.findOne(params.id, user._id);
  }

  @ApiOperation({ summary: 'Atualizar um gênero do usuário' })
  @ApiOkResponse({
    description: 'Gênero atualizado com sucesso',
    type: GenreResponseDto,
  })
  @Patch(':id')
  async update(
    @Param() params: IDMongoQueryDTO,
    @UserRequest() user: UserRequestDTO,
    @Body() dto: UpdateGenreDto,
  ) {
    return this.userGenresService.update(params.id, user._id, dto);
  }

  @ApiOperation({ summary: 'Deletar um gênero do usuário' })
  @ApiNoContentResponse({ description: 'Gênero deletado com sucesso' })
  @HttpCode(204)
  @Delete(':id')
  async remove(
    @Param() params: IDMongoQueryDTO,
    @UserRequest() user: UserRequestDTO,
  ) {
    return this.userGenresService.remove(params.id, user._id);
  }
}
