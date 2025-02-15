import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Roles } from '../../roles/enums/role.enum';

export type UsersDocument = Users & Document;

@Schema({ timestamps: true })
export class Users {
  _id?: mongoose.ObjectId | string;

  @Prop({ required: true, lowercase: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({
    type: mongoose.Schema.Types.Array,
    required: true,
    default: [Roles.USER],
  })
  roles: Roles[];

  @Prop({ required: true, select: false })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
