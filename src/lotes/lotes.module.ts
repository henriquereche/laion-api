import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EditalSchema } from 'src/shared/schemas/edital.schema';
import { LoteSchema } from 'src/shared/schemas/lote.schema';
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
        LotesProvider
    ]
})
export class LotesModule { }
