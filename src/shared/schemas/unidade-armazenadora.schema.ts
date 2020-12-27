import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UnidadeArmazenadora } from '../models/unidade-armazenadora.model';

export type UnidadeArmazenadoraSchema = UnidadeArmazenadora & Document

export const UnidadeArmazenadoraSchema = {
    name: "UnidadeArmazenadora",
    schema: SchemaFactory.createForClass(UnidadeArmazenadora)
};