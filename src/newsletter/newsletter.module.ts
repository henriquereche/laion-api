import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsletterRegistrationSchema } from 'src/shared/schemas/newsletter-registration.schema';
import { NewsletterSchema } from 'src/shared/schemas/newsletter.schema';
import { NewsletterResolver } from './newsletter.resolver';
import { NewsletterProvider } from './providers/newsletter.provider';

@Module({
    imports: [
        MongooseModule.forFeature([
            NewsletterRegistrationSchema, 
            NewsletterSchema
        ])
    ],
    providers: [NewsletterResolver, NewsletterProvider]
})
export class NewsletterModule { }
