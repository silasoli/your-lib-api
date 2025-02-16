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
import { AuthorResponseDto } from '../dto/author-response.dto';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { Role } from '../../roles/decorators/roles.decorator';
import { IDMongoQueryDTO } from '../../common/dto/id-mongo-query.dto';
import { AdminAuthorsService } from '../services/admin-authors.service';

@ApiBearerAuth()
@ApiTags('Authors - Admin')
@Controller('admin/authors')
@UseGuards(AuthUserJwtGuard, RoleGuard)
@Role([Roles.ADMIN])
export class AdminAuthorsController {
  constructor(private readonly adminAuthorsService: AdminAuthorsService) {}

  @ApiOperation({
    summary: 'Criar um autor global (acessível por todos os usuários)',
  })
  @ApiCreatedResponse({
    description: 'Autor global criado com sucesso',
    type: AuthorResponseDto,
  })
  @Post()
  async create(@Body() dto: CreateAuthorDto) {
    return this.adminAuthorsService.create(dto);
  }

  @ApiOperation({ summary: 'Obter todos os autores (globais e privados)' })
  @ApiOkResponse({
    description: 'Lista de autores retornada',
    type: [AuthorResponseDto],
  })
  @Get()
  async findAll() {
    return this.adminAuthorsService.findAll();
  }

  @ApiOperation({ summary: 'Atualizar um autor global' })
  @ApiOkResponse({
    description: 'Autor atualizado com sucesso',
    type: AuthorResponseDto,
  })
  @Patch(':id')
  async update(@Param() params: IDMongoQueryDTO, @Body() dto: UpdateAuthorDto) {
    return this.adminAuthorsService.update(params.id, dto);
  }

  //   @ApiOperation({ summary: 'Deletar um autor global' })
  //   @ApiNoContentResponse({ description: 'Autor deletado com sucesso' })
  //   @HttpCode(204)
  //   @Delete(':id')
  //   async remove(@Param() params: IDMongoQueryDTO) {
  //     return this.adminAuthorsService.remove(params.id);
  //   }
}
