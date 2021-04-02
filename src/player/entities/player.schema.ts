import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema({ autoCreate: true, timestamps: true, collection: 'players' })
export class Player {
  @Prop()
  name: string;

  @Prop({ unique: true, type: String })
  email: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  ranking: string;

  @Prop({ type: Number })
  posicaoRanking: number;

  @Prop({ type: String })
  urlFotoJogador: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
