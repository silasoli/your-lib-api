import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AuthorsDocument = Authors & Document;

@Schema({ timestamps: true })
export class Authors {
  _id?: mongoose.ObjectId | string;

  @Prop({ required: true })
  name: string;

  @Prop()
  bio?: string;

  // @Prop()
  // birthDate?: Date;

  // @Prop()
  // nationality?: string;

  @Prop({ default: null }) // Se for null, é um autor global (admin)
  userId?: string;
}

export const AuthorsSchema = SchemaFactory.createForClass(Authors);
