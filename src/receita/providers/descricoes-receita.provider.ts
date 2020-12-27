import { Injectable } from "@nestjs/common";
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

@Injectable()
export class DescricoesReceitaProvider {

    private readonly situacaoModel: Model<SituacaoSchema>;
    private readonly orgaoModel: Model<OrgaoSchema>;
    private readonly tipoLoteModel: Model<TipoLoteSchema>;
    private readonly unidadeArmazenadoraModel: Model<UnidadeArmazenadoraSchema>;

    constructor(
        @InjectModel(SituacaoSchema.name) situacaoModel: Model<SituacaoSchema>,
        @InjectModel(OrgaoSchema.name) orgaoModel: Model<OrgaoSchema>,
        @InjectModel(TipoLoteSchema.name) tipoLoteModel: Model<TipoLoteSchema>,
        @InjectModel(UnidadeArmazenadoraSchema.name) unidadeArmazenadoraModel: Model<UnidadeArmazenadoraSchema>
    ) {
        this.situacaoModel = situacaoModel;
        this.orgaoModel = orgaoModel;
        this.tipoLoteModel = tipoLoteModel;
        this.unidadeArmazenadoraModel = unidadeArmazenadoraModel;
    }

    /**
     * Obtêm ou cria a unidade armazenadora a partir de seu nome.
     * @param nome nome da unidade armazenadora.
     */
    public async getUnidadeArmazenadora(nome: string): Promise<UnidadeArmazenadora> {

        nome = this.normalizeDescription(nome);
        let unidadeArmazenadora = await this.unidadeArmazenadoraModel
            .findOne({ nome: nome });

        if (unidadeArmazenadora == null) {

            unidadeArmazenadora = new this.unidadeArmazenadoraModel({ nome: nome });
            await unidadeArmazenadora.save();
        }

        return unidadeArmazenadora;
    }

    /**
     * Obtêm ou cria o tipoLote a partir de sua descrição.
     * @param descricao descrição do tipo de lote.
     */
    public async getTipoLote(descricao: string): Promise<TipoLote> {

        descricao = this.normalizeDescription(descricao);
        let tipoLote = await this.tipoLoteModel
            .findOne({ descricao: descricao });

        if (tipoLote == null) {

            tipoLote = new this.tipoLoteModel({ descricao: descricao });
            await tipoLote.save();
        }

        return tipoLote;
    }

    /**
     * Obtêm ou cria a situacao a partir de sua descrição.
     * @param descricao descrição da situacao.
     */
    public async getSituacao(descricao: string): Promise<Situacao> {

        descricao = this.normalizeDescription(descricao);
        let situacao = await this.situacaoModel
            .findOne({ descricao: descricao });

        if (situacao == null) {

            situacao = new this.situacaoModel({ descricao: descricao });
            await situacao.save();
        }

        return situacao;
    }

    /**
     * Obtêm ou cria o orgão a partir de seu nome.
     * @param nome nome do orgão.
     */
    public async getOrgao(nome: string): Promise<Orgao> {

        nome = this.normalizeDescription(nome);
        let orgao = await this.orgaoModel
            .findOne({ nome: nome });

        if (orgao == null) {

            orgao = new this.orgaoModel({ nome: nome });
            await orgao.save();
        }

        return orgao;
    }

    /**
     * Normaliza o texto para o padrão das descrições e nomes.
     * @param value valor a ser normalizado.
     */
    private normalizeDescription(value: string): string {
        return value.toUpperCase().trim();
    }
}