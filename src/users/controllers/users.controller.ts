import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { USERS_ERRORS } from '../constants/users.errors';
import { AuthUserJwtGuard } from '../../auth/guards/auth-user-jwt.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IDMongoQueryDTO } from '../../common/dto/id-mongo-query.dto';
import { Role } from '../../roles/decorators/roles.decorator';
import { Roles } from '../../roles/enums/role.enum';
import { RoleGuard } from '../../roles/guards/role.guard';

@ApiBearerAuth()
@ApiTags('Users - Admin')
@Controller('admin/users')
@UseGuards(AuthUserJwtGuard, RoleGuard)
@Role([Roles.ADMIN])
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Criar conta de usuário' })
  @ApiCreatedResponse({
    description: 'Conta de usuário criada com sucesso',
    type: UserResponseDto,
  })
  @ApiBody({ type: CreateUserDto })
  @Post()
  public async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'Obter listagem de contas dos usuários' })
  @ApiOkResponse({
    description: 'Listagem de contas dos usuários retornada com sucesso',
    type: [UserResponseDto],
  })
  @Get()
  findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Obter conta do usuário' })
  @ApiOkResponse({
    description: 'Conta do usuário retornada com sucesso',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: USERS_ERRORS.NOT_FOUND.getStatus(),
    description: USERS_ERRORS.NOT_FOUND.message,
  })
  @Get(':id')
  public async findOne(
    @Param() params: IDMongoQueryDTO,
  ): Promise<UserResponseDto> {
    return this.usersService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Editar conta de um usuário' })
  @ApiOkResponse({
    description: 'Edição de conta de usuário com sucesso',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: USERS_ERRORS.NOT_FOUND.getStatus(),
    description: USERS_ERRORS.NOT_FOUND.message,
  })
  @ApiBody({ type: UpdateUserDto })
  @Patch(':id')
  public async update(
    @Param() params: IDMongoQueryDTO,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(params.id, dto);
  }

  @ApiOperation({ summary: 'Deletar conta de um usuário' })
  @ApiNoContentResponse({
    description: 'Conta do usuário deletada com sucesso',
  })
  @ApiResponse({
    status: USERS_ERRORS.NOT_FOUND.getStatus(),
    description: USERS_ERRORS.NOT_FOUND.message,
  })
  @HttpCode(204)
  @Delete(':id')
  public async remove(@Param() params: IDMongoQueryDTO) {
    return this.usersService.remove(params.id);
  }
}
