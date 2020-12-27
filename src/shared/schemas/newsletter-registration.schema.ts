import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NewsletterRegistration } from '../models/newsletter-registration.model';

export type NewsletterRegistrationSchema = NewsletterRegistration & Document;

export const NewsletterRegistrationSchema = {
    name: "NewsletterRegistration",
    schema: SchemaFactory.createForClass(NewsletterRegistration)
};