import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { BookCondition, BookStatus } from '../enums/book.enum';

export type BooksDocument = Books & Document;

@Schema({ timestamps: true })
export class Books {
  _id?: mongoose.ObjectId | string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Author' }], required: false })
  authors: Types.ObjectId[];

  @Prop({ required: true })
  pages: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Genre' }], required: false })
  genres: Types.ObjectId[];

  @Prop({ enum: BookStatus, required: true })
  status: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ enum: BookCondition, required: true })
  condition: string;

  @Prop()
  description?: string;
}

export const BooksSchema = SchemaFactory.createForClass(Books);
