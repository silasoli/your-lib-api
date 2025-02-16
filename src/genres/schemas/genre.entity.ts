import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type GenresDocument = Genres & Document;

@Schema({ timestamps: true })
export class Genres {
  _id?: mongoose.ObjectId | string;

  @Prop({ required: true, unique: false })
  name: string;

  @Prop()
  description?: string;

  @Prop({ default: null })
  userId?: string;
}

export const GenresSchema = SchemaFactory.createForClass(Genres);
