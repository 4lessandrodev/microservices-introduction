import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Result {
  @Prop({ required: true, type: String })
  set: string;
}

export type PlaysDocument = Plays & Document;

@Schema({ autoCreate: true, timestamps: true, collection: 'plays' })
export class Plays {
  readonly _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Player', required: true })
  def: string;

  @Prop({ type: Result, default: [] })
  result: Array<Result>;

  @Prop({ type: Types.ObjectId, ref: 'Player', default: [] })
  players: Array<string>;
}

export const PlaysSchema = SchemaFactory.createForClass(Plays);
