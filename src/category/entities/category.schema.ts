import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Event } from './event.schema';

export type CategoryDocument = Category & Document;

@Schema({
  autoCreate: true,
  timestamps: true,
  collection: 'categories',
})
export class Category {
  readonly _id: Types.ObjectId;

  @Prop({ type: String, unique: true, maxlength: 7, required: true })
  category: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Event, required: true })
  events: Array<Event>;

  @Prop({ ref: 'Player', type: Types.ObjectId, default: [], required: false })
  players?: Array<string>;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
