import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Situacao } from '../models/situacao.model';

export type SituacaoSchema = Situacao & Document;

export const SituacaoSchema = {
    name: "Situacao",
    schema: SchemaFactory.createForClass(Situacao)
};