// genres/controllers/admin-genres.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthUserJwtGuard } from '../../auth/guards/auth-user-jwt.guard';
import { Roles } from '../../roles/enums/role.enum';
import { RoleGuard } from '../../roles/guards/role.guard';
import { GenreResponseDto } from '../dto/genre-response.dto';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';
import { Role } from '../../roles/decorators/roles.decorator';
import { AdminGenresService } from '../services/admin-genres.service';
import { IDMongoQueryDTO } from '../../common/dto/id-mongo-query.dto';

@ApiBearerAuth()
@ApiTags('Genres - Admin')
@Controller('admin/genres')
@UseGuards(AuthUserJwtGuard, RoleGuard)
@Role([Roles.ADMIN])
export class AdminGenresController {
  constructor(private readonly adminGenresService: AdminGenresService) {}

  @ApiOperation({
    summary: 'Criar um gênero global (acessível por todos os usuários)',
  })
  @ApiCreatedResponse({
    description: 'Gênero global criado com sucesso',
    type: GenreResponseDto,
  })
  @Post()
  async create(@Body() dto: CreateGenreDto) {
    return this.adminGenresService.create(dto);
  }

  @ApiOperation({ summary: 'Obter todos os gêneros globais' })
  @ApiOkResponse({
    description: 'Lista de gêneros globais retornada',
    type: [GenreResponseDto],
  })
  @Get()
  async findAll() {
    return this.adminGenresService.findAll();
  }

  @ApiOperation({ summary: 'Obter um gênero global específico' })
  @ApiOkResponse({ description: 'Gênero encontrado', type: GenreResponseDto })
  @Get(':id')
  async findOne(@Param() params: IDMongoQueryDTO) {
    return this.adminGenresService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Atualizar um gênero global' })
  @ApiOkResponse({
    description: 'Gênero atualizado com sucesso',
    type: GenreResponseDto,
  })
  @Patch(':id')
  async update(@Param() params: IDMongoQueryDTO, @Body() dto: UpdateGenreDto) {
    return this.adminGenresService.update(params.id, dto);
  }

  //   @ApiOperation({ summary: 'Deletar um gênero global' })
  //   @ApiNoContentResponse({ description: 'Gênero deletado com sucesso' })
  //   @HttpCode(204)
  //   @Delete(':id')
  //   async remove(@Param() params: IDMongoQueryDTO) {
  //     return this.adminGenresService.remove(params.id);
  //   }
}
