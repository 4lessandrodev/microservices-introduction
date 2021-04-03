import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Player } from '../../player/entities/player.schema';
import { Plays } from '../../plays/entities/plays.schema';

export enum ChallengeStatus {
  'DONE',
  'PENDING',
  'CANCELLED',
  'ACCEPTED',
  'REFUSED',
}

export type ChallengeDocument = Challenge & Document;

@Schema({ autoCreate: true, autoIndex: true, collection: 'challenges' })
export class Challenge {
  @Prop({ type: Date, required: true })
  challengeHappensAt!: string;

  @Prop({ type: String, enum: ChallengeStatus, required: true })
  status!: keyof typeof ChallengeStatus;

  @Prop({ type: Date, required: true, default: new Date(), immutable: true })
  readonly requestedAt!: Date;

  @Prop({ type: Date })
  answeredAt!: Date;

  @Prop({ type: Types.ObjectId, ref: 'Player' })
  requester!: string;

  @Prop({ type: String })
  category!: string;

  @Prop({ type: Types.ObjectId, ref: 'Player', required: true })
  players!: Array<Player>;

  @Prop({ type: Types.ObjectId, ref: 'Plays' })
  plays?: Plays;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
