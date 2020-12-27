import { CACHE_MANAGER, Inject } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Orgao } from "src/shared/models/orgao.model";
import { Situacao } from "src/shared/models/situacao.model";
import { TipoLote } from "src/shared/models/tipo-lote.model";
import { UnidadeArmazenadora } from "src/shared/models/unidade-armazenadora.model";
import { OrgaoSchema } from "src/shared/schemas/orgao.schema";
import { SituacaoSchema } from "src/shared/schemas/situacao-lote.schema";
import { TipoLoteSchema } from "src/shared/schemas/tipo-lote.schema";
import { UnidadeArmazenadoraSchema } from "src/shared/schemas/unidade-armazenadora.schema";
import { Cache } from "cache-manager";
import { FOUR_HOURS } from "src/shared/constants/cache-times";
import { 
    RECEITA_ORGAOS, 
    RECEITA_SITUACOES, 
    RECEITA_TIPOS_LOTES, 
    RECEITA_UNIDADES_ARMAZENADORAS
} from "src/shared/constants/cache-keys";

@Resolver()
export class ReceitaResolver {

    private readonly cacheManager: Cache;

    private readonly situacaoModel: Model<SituacaoSchema>;
    private readonly orgaoModel: Model<OrgaoSchema>;
    private readonly tipoLoteModel: Model<TipoLoteSchema>;
    private readonly unidadeArmazenadoraModel: Model<UnidadeArmazenadoraSchema>;

    constructor(
        @Inject(CACHE_MANAGER) cacheManager: Cache,
        @InjectModel(SituacaoSchema.name) situacaoModel: Model<SituacaoSchema>,
        @InjectModel(OrgaoSchema.name) orgaoModel: Model<OrgaoSchema>,
        @InjectModel(TipoLoteSchema.name) tipoLoteModel: Model<TipoLoteSchema>,
        @InjectModel(UnidadeArmazenadoraSchema.name) unidadeArmazenadoraModel: Model<UnidadeArmazenadoraSchema>
    ) {
        this.cacheManager = cacheManager;
        this.situacaoModel = situacaoModel;
        this.orgaoModel = orgaoModel;
        this.tipoLoteModel = tipoLoteModel;
        this.unidadeArmazenadoraModel = unidadeArmazenadoraModel;
    }

    @Query(
        returns => [Orgao],
        { description: "Obtêm a lista de todos os orgãos.", complexity: 15 }
    )
    public async orgaos(): Promise<Array<Orgao>> {

        let orgaos = await this.cacheManager.get(RECEITA_ORGAOS);

        if (orgaos == null) {

            orgaos = await this.orgaoModel.find();
            await this.cacheManager.set(RECEITA_ORGAOS, orgaos, FOUR_HOURS);
        }

        return orgaos as Orgao[];
    }
    
    @Query(
        returns => [Situacao],
        { description: "Obtêm a lista de todos as situações da receita.", complexity: 15 }
    )
    public async situacoes(): Promise<Array<Situacao>> {

        let situacoes = await this.cacheManager.get(RECEITA_SITUACOES);

        if (situacoes == null) {

            situacoes = await this.situacaoModel.find();
            await this.cacheManager.set(RECEITA_SITUACOES, situacoes, FOUR_HOURS);
        }
        
        return situacoes;
    }
    
    @Query(
        returns => [TipoLote],
        { description: "Obtêm todos o tipos de lotes (tipos dos produtos).", complexity: 15 }
    )
    public async tiposLotes(): Promise<Array<TipoLote>> {

        let tiposLotes = await this.cacheManager.get(RECEITA_TIPOS_LOTES);

        if (tiposLotes == null) {
            
            tiposLotes = await this.tipoLoteModel.find();
            await this.cacheManager.set(RECEITA_TIPOS_LOTES, tiposLotes, FOUR_HOURS);
        }

        return tiposLotes;
    }
    
    @Query(
        returns => [UnidadeArmazenadora],
        { description: "Obtêm todos as unidades armazenadoras.", complexity: 15 }
    )
    public async unidadesArmazenadoras(): Promise<Array<UnidadeArmazenadora>> {

        let unidadesArmazenadoras = await this.cacheManager.get(RECEITA_UNIDADES_ARMAZENADORAS);

        if (unidadesArmazenadoras == null) {

            unidadesArmazenadoras = await this.unidadeArmazenadoraModel.find();
            this.cacheManager.set(RECEITA_UNIDADES_ARMAZENADORAS, unidadesArmazenadoras, FOUR_HOURS);
        }

        return unidadesArmazenadoras;
    }
}