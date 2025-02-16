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
import { AuthorResponseDto } from '../dto/author-response.dto';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { Role } from '../../roles/decorators/roles.decorator';
import { IDMongoQueryDTO } from '../../common/dto/id-mongo-query.dto';
import { UserRequest } from '../../auth/decorators/user-request.decorator';
import { UserRequestDTO } from '../../auth/dto/user-request.dto';
import { UserAuthorsService } from '../services/user-authors.service';

@ApiBearerAuth()
@ApiTags('Authors - User')
@Controller('users/authors')
@UseGuards(AuthUserJwtGuard, RoleGuard)
@Role([Roles.USER])
export class UserAuthorsController {
  constructor(private readonly userAuthorsService: UserAuthorsService) {}

  @ApiOperation({ summary: 'Criar um autor privado (vinculado ao usuário)' })
  @ApiCreatedResponse({
    description: 'Autor criado com sucesso',
    type: AuthorResponseDto,
  })
  @Post()
  async create(
    @UserRequest() user: UserRequestDTO,
    @Body() dto: CreateAuthorDto,
  ) {
    return this.userAuthorsService.create(user._id, dto);
  }

  @ApiOperation({ summary: 'Obter autores criados pelo usuário' })
  @ApiOkResponse({
    description: 'Lista de autores do usuário retornada',
    type: [AuthorResponseDto],
  })
  @Get()
  async findUserAuthors(@UserRequest() user: UserRequestDTO) {
    return this.userAuthorsService.findUserAuthors(user._id);
  }

  @ApiOperation({ summary: 'Atualizar um autor (somente se for do usuário)' })
  @ApiOkResponse({
    description: 'Autor atualizado com sucesso',
    type: AuthorResponseDto,
  })
  @Patch(':id')
  async update(
    @Param() params: IDMongoQueryDTO,
    @UserRequest() user: UserRequestDTO,
    @Body() dto: UpdateAuthorDto,
  ) {
    return this.userAuthorsService.update(params.id, user._id, dto);
  }

  @ApiOperation({ summary: 'Deletar um autor (somente se for do usuário)' })
  @ApiNoContentResponse({ description: 'Autor deletado com sucesso' })
  @HttpCode(204)
  @Delete(':id')
  async remove(
    @Param() params: IDMongoQueryDTO,
    @UserRequest() user: UserRequestDTO,
  ) {
    return this.userAuthorsService.remove(params.id, user._id);
  }
}
