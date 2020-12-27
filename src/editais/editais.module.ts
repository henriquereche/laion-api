import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EditalSchema } from 'src/shared/schemas/edital.schema';
import { LoteSchema } from 'src/shared/schemas/lote.schema';
import { EditaisResolver } from './resolvers/editais.resolver';
import { EditalResolver } from './resolvers/edital.resolver';
import { EditaisProvider } from './providers/editais.provider';

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
        EditaisProvider
    ]
})
export class EditaisModule {}
