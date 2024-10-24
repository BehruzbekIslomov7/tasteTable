
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Restoran } from '../../restoran/schemas/restoran.schema';

export type TablesDocument = HydratedDocument<Tables>;

@Schema({versionKey:false})
export class Tables {
  @Prop()
  number: string;
  
  @Prop()
  amount: number;

  @Prop()
  qr_code: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restoran',
  })
  restoran_id: Restoran;

}

export const TablesSchema = SchemaFactory.createForClass(Tables);