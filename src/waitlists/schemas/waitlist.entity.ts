import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WaitlistsDocument = Waitlists & Document;

@Schema({ timestamps: true })
export class Waitlists {
  @Prop({ type: Types.ObjectId, required: true })
  _id?: Types.ObjectId | string;

  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  borrowerName: string;

  @Prop({ required: true })
  borrowerEmail: string;

  @Prop({ required: true, default: Date.now })
  addedAt: Date;

  @Prop({ required: true })
  position: number;
}

export const WaitlistsSchema = SchemaFactory.createForClass(Waitlists);
