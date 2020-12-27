import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Lote } from '../models/lote.model';

export type LoteSchema = Lote & Document;

export const LoteSchema = {
    name: "LoteSchema",
    schema: SchemaFactory.createForClass(Lote)
};