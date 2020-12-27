import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Edital } from '../models/edital.model';

export type EditalSchema = Edital & Document;

export const EditalSchema = {
    name: "Edital",
    schema: SchemaFactory.createForClass(Edital)
}