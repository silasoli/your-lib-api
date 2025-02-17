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
import { WaitlistsService } from '../services/waitlists.service';
import { CreateWaitlistDto } from '../dto/create-waitlist.dto';
import { UpdateWaitlistDto } from '../dto/update-waitlist.dto';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { UserRequest } from '../../auth/decorators/user-request.decorator';
import { UserRequestDTO } from '../../auth/dto/user-request.dto';
import { IDMongoQueryDTO } from '../../common/dto/id-mongo-query.dto';
import { WaitlistResponseDto } from '../dto/waitlist-response.dto';
import { AuthUserJwtGuard } from '../../auth/guards/auth-user-jwt.guard';
import { Role } from '../../roles/decorators/roles.decorator';
import { Roles } from '../../roles/enums/role.enum';
import { RoleGuard } from '../../roles/guards/role.guard';

@ApiBearerAuth()
@ApiTags('Waitlists - User')
@Controller('users/waitlists')
@UseGuards(AuthUserJwtGuard, RoleGuard)
@Role([Roles.USER])
export class WaitlistsController {
  constructor(private readonly waitlistsService: WaitlistsService) {}

  @ApiOperation({ summary: 'Adicionar tomador à fila de espera de um livro' })
  @ApiCreatedResponse({
    description: 'Tomador adicionado à fila',
    type: WaitlistResponseDto,
  })
  @Post()
  async create(
    @UserRequest() user: UserRequestDTO,
    @Body() dto: CreateWaitlistDto,
  ) {
    return this.waitlistsService.create(user._id, dto);
  }

  @ApiOperation({ summary: 'Listar fila de espera de um livro' })
  @ApiOkResponse({
    description: 'Lista da fila de espera retornada',
    type: [WaitlistResponseDto],
  })
  @Get(':bookId')
  async findAll(
    @UserRequest() user: UserRequestDTO,
    @Param() params: IDMongoQueryDTO,
  ) {
    return this.waitlistsService.findAll(user._id, params.id);
  }

  @ApiOperation({ summary: 'Atualizar dados do tomador na fila' })
  @ApiOkResponse({
    description: 'Dados do tomador na fila atualizados',
    type: WaitlistResponseDto,
  })
  @Patch(':id')
  async update(
    @Param() params: IDMongoQueryDTO,
    @UserRequest() user: UserRequestDTO,
    @Body() dto: UpdateWaitlistDto,
  ) {
    return this.waitlistsService.update(params.id, user._id, dto);
  }

  @ApiOperation({ summary: 'Remover tomador da fila de espera' })
  @ApiNoContentResponse({ description: 'Tomador removido da fila' })
  @HttpCode(204)
  @Delete(':id')
  async remove(
    @Param() params: IDMongoQueryDTO,
    @UserRequest() user: UserRequestDTO,
  ) {
    return this.waitlistsService.remove(params.id, user._id);
  }
}
