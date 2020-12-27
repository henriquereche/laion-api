import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EditalSchema } from 'src/shared/schemas/edital.schema';
import { LoteSchema } from 'src/shared/schemas/lote.schema';
import { OrgaoSchema } from 'src/shared/schemas/orgao.schema';
import { SituacaoSchema } from 'src/shared/schemas/situacao-lote.schema';
import { TipoLoteSchema } from 'src/shared/schemas/tipo-lote.schema';
import { UnidadeArmazenadoraSchema } from 'src/shared/schemas/unidade-armazenadora.schema';
import { DescricoesReceitaProvider } from './providers/descricoes-receita.provider';
import { ImportacaoEditaisProvider } from './providers/importacao-editais.provider';
import { ReceitaFederalProvider } from './providers/receita-federal.provider';
import { ImportacaoEditaisWorker } from './workers/importacao-editais.worker';
import { ReceitaModelsFactoryProvider } from './providers/receita-models-factory.provider';
import { ReceitaResolver } from './receita.resolver';

@Module({
    imports: [
        HttpModule,
        CacheModule.register(),
        MongooseModule.forFeature([
            EditalSchema,
            LoteSchema,
            SituacaoSchema,
            OrgaoSchema,
            TipoLoteSchema,
            UnidadeArmazenadoraSchema,
        ])
    ],
    providers: [
        ImportacaoEditaisProvider, 
        ReceitaFederalProvider, 
        DescricoesReceitaProvider,
        ReceitaModelsFactoryProvider,
        ImportacaoEditaisWorker,
        ReceitaResolver
    ]
})
export class ReceitaModule { }
