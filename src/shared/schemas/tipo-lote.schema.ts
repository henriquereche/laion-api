import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TipoLote } from '../models/tipo-lote.model';

export type TipoLoteSchema = TipoLote & Document;

export const TipoLoteSchema = {
    name: "TipoLote",
    schema: SchemaFactory.createForClass(TipoLote)
};