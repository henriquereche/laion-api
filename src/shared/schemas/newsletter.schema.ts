import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Newsletter } from '../models/newsletter.model';

export type NewsletterSchema = Newsletter & Document;

export const NewsletterSchema = {
    name: "Newsletter",
    schema: SchemaFactory.createForClass(Newsletter)
};