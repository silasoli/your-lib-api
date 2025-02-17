import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { BookCondition } from '../../books/enums/book.enum';
import { LoanStatus } from '../enums/loan.enum';

export type LoansDocument = Loans & Document;

@Schema({ timestamps: true })
export class Loans {
  _id?: mongoose.ObjectId | string;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  book: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  loanDate: Date;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: false })
  returnDate?: Date;

  @Prop({ enum: LoanStatus, required: true, default: LoanStatus.BORROWED })
  status: LoanStatus;

  @Prop({ required: true })
  borrowerName: string;

  @Prop({ required: true })
  borrowerEmail: string;

  @Prop({ required: true, enum: BookCondition })
  bookConditionBefore: string;

  @Prop({ required: false, enum: BookCondition })
  bookConditionAfter?: string;

  @Prop({ required: false })
  notes?: string;
}

export const LoansSchema = SchemaFactory.createForClass(Loans);
