import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { EditalSchema } from 'src/shared/schemas/edital.schema';
import { LoteSchema } from 'src/shared/schemas/lote.schema';
import { EditaisLoader } from './providers/editais.loader';
import { LotesProvider } from './providers/lotes.provider';
import { LoteResolver } from './resolvers/lote.resolver';
import { LotesResolver } from './resolvers/lotes.resolver';

@Module({
    imports: [
        MongooseModule.forFeature([
            LoteSchema,
            EditalSchema
        ])
    ],
    providers: [
        LoteResolver,
        LotesResolver, 
        LotesProvider,
        EditaisLoader,
        {
            provide: APP_INTERCEPTOR,
            useClass: DataLoaderInterceptor,
        },
    ]
})
export class LotesModule { }
