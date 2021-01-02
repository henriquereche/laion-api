import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EditalSchema } from 'src/shared/schemas/edital.schema';
import { LoteSchema } from 'src/shared/schemas/lote.schema';
import { EditaisResolver } from './resolvers/editais.resolver';
import { EditalResolver } from './resolvers/edital.resolver';
import { EditaisProvider } from './providers/editais.provider';
import { LotesLoader } from './providers/lotes.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

@Module({
    imports: [
        MongooseModule.forFeature([
            EditalSchema,
            LoteSchema
        ])
    ],
    providers: [
        EditalResolver,
        EditaisResolver, 
        EditaisProvider,
        LotesLoader,
        {
            provide: APP_INTERCEPTOR,
            useClass: DataLoaderInterceptor,
        },
    ]
})
export class EditaisModule {}
