import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Genres extends Document {
  @Prop({ required: true, unique: false })
  name: string;

  @Prop()
  description?: string;

  @Prop({ default: null })
  userId?: string;
}

export const GenresSchema = SchemaFactory.createForClass(Genres);
