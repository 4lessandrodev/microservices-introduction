import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Operation } from '../dto/create-event.dto';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, enum: Operation, required: true })
  operation!: keyof typeof Operation;

  @Prop({ type: Number, required: true })
  value!: number;
}
