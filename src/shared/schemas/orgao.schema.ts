import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Orgao } from '../models/orgao.model';

export type OrgaoSchema = Orgao & Document;

export const OrgaoSchema = {
    name: "Orgao",
    schema: SchemaFactory.createForClass(Orgao)
};