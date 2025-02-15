import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { USERS_ERRORS } from '../constants/users.errors';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Users, UsersDocument } from '../schemas/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';
import { Roles } from '../../roles/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private usersModel: Model<UsersDocument>,
  ) {}

  private async transformBody(dto: CreateUserDto | UpdateUserDto) {
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 12);
  }

  private async findByID(_id: string): Promise<Users> {
    const user = await this.usersModel.findById(_id);
    if (!user) throw USERS_ERRORS.NOT_FOUND;
    return user;
  }

  public async create(dto: CreateUserDto): Promise<UserResponseDto> {
    await this.transformBody(dto);
    const created = await this.usersModel.create(dto);
    return new UserResponseDto(created);
  }

  public async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersModel.find();
    return users.map((item) => new UserResponseDto(item));
  }

  public async findByEmail(email: string): Promise<Users | null> {
    return this.usersModel.findOne({ email: email.toLowerCase() }, [
      '+password',
    ]);
  }

  public async findOne(_id: string): Promise<UserResponseDto> {
    const user = await this.findByID(_id);
    return new UserResponseDto(user);
  }

  public async update(
    _id: string,
    dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    await this.findByID(_id);
    const rawData = { ...dto };
    await this.transformBody(rawData);
    await this.usersModel.updateOne({ _id }, rawData);
    return this.findOne(_id);
  }

  public async remove(_id: string): Promise<void> {
    await this.findByID(_id);
    await this.usersModel.deleteOne({ _id });
  }

  public async comparePass(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  public async findRolesOfUser(_id: string): Promise<Roles[]> {
    const user = await this.usersModel.findOne({ _id }, ['roles']);

    if (!user) throw USERS_ERRORS.NOT_FOUND;

    return user.roles;
  }

}
