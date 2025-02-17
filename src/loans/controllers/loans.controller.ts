import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { AuthUserJwtGuard } from '../../auth/guards/auth-user-jwt.guard';
import { CreateLoanDto } from '../dto/create-loan.dto';
import { UpdateLoanDto } from '../dto/update-loan.dto';
import { LoanResponseDto } from '../dto/loan-response.dto';
import { IDMongoQueryDTO } from '../../common/dto/id-mongo-query.dto';
import { UserRequest } from '../../auth/decorators/user-request.decorator';
import { UserRequestDTO } from '../../auth/dto/user-request.dto';
import { LoansService } from '../services/loans.service';
import { Role } from '../../roles/decorators/roles.decorator';
import { Roles } from '../../roles/enums/role.enum';
import { RoleGuard } from '../../roles/guards/role.guard';

@ApiBearerAuth()
@ApiTags('Loans - User')
@Controller('users/loans')
@UseGuards(AuthUserJwtGuard, RoleGuard)
@Role([Roles.USER])
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @ApiOperation({ summary: 'Registrar um novo empréstimo' })
  @ApiCreatedResponse({
    description: 'Empréstimo registrado com sucesso',
    type: LoanResponseDto,
  })
  @Post()
  async create(
    @UserRequest() user: UserRequestDTO,
    @Body() dto: CreateLoanDto,
  ) {
    return this.loansService.create(user._id, dto);
  }

  @ApiOperation({ summary: 'Obter todos os empréstimos ativos do usuário' })
  @ApiOkResponse({
    description: 'Lista de empréstimos ativos',
    type: [LoanResponseDto],
  })
  @Get('active')
  async findAllActive(@UserRequest() user: UserRequestDTO) {
    return this.loansService.findAllActive(user._id);
  }

  @ApiOperation({ summary: 'Obter histórico de empréstimos do usuário' })
  @ApiOkResponse({
    description: 'Lista de empréstimos finalizados',
    type: [LoanResponseDto],
  })
  @Get('history')
  async findHistory(@UserRequest() user: UserRequestDTO) {
    return this.loansService.findHistory(user._id);
  }

  @ApiOperation({ summary: 'Obter detalhes de um empréstimo' })
  @ApiOkResponse({
    description: 'Detalhes do empréstimo',
    type: LoanResponseDto,
  })
  @Get(':id')
  async findOne(
    @Param() params: IDMongoQueryDTO,
    @UserRequest() user: UserRequestDTO,
  ) {
    return this.loansService.findOne(params.id, user._id);
  }

  @ApiOperation({ summary: 'Atualizar status do empréstimo' })
  @ApiOkResponse({
    description: 'Empréstimo atualizado',
    type: LoanResponseDto,
  })
  @Patch(':id')
  async update(
    @Param() params: IDMongoQueryDTO,
    @UserRequest() user: UserRequestDTO,
    @Body() dto: UpdateLoanDto,
  ) {
    return this.loansService.update(params.id, user._id, dto);
  }

  @ApiOperation({ summary: 'Remover um empréstimo finalizado' })
  @ApiNoContentResponse({ description: 'Empréstimo removido com sucesso' })
  @Delete(':id')
  async remove(
    @Param() params: IDMongoQueryDTO,
    @UserRequest() user: UserRequestDTO,
  ) {
    return this.loansService.remove(params.id, user._id);
  }
}
