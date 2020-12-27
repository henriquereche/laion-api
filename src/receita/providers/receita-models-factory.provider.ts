import { Injectable } from "@nestjs/common";
import { Edital } from "src/shared/models/edital.model";
import { ItemLote } from "src/shared/models/item-lote.model";
import { Lote } from "src/shared/models/lote.model";
import { EditalReceitaResponse } from "../interfaces/edital-receita-response.interface";
import { ItemLoteReceitaResponse } from "../interfaces/item-lote-receita-response.interface";
import { LoteReceitaResponse } from "../interfaces/lote-receita-response.interface";
import { DescricoesReceitaProvider } from "./descricoes-receita.provider";

@Injectable()
export class ReceitaModelsFactoryProvider {

    private readonly descricoesReceitaProvider: DescricoesReceitaProvider;

    constructor(descricoesReceitaProvider: DescricoesReceitaProvider) {
        this.descricoesReceitaProvider = descricoesReceitaProvider;
    }

    /**
     * Cria a model do edital a partir do retorno da receita.
     * @param edital retorno edital do servidor da receita federal.
     */
    public async createEditalModel(edital: EditalReceitaResponse): Promise<Edital> {

        const model = new Edital();
        model.codigo = edital.edle;
        model.contato = edital.formaContato;
        model.dataClassificacao = new Date(edital.dataClassificacao);
        model.dataInicioPropostas = new Date(edital.dataInicioPropostas);
        model.dataTerminoPropostas = new Date(edital.dataFimPropostas);
        model.nome = edital.edle;
        model.permitePessoaFisica = edital.permitePF;

        model.orgao = await this.descricoesReceitaProvider
            .getOrgao(edital.orgao);

        model.situacao = await this.descricoesReceitaProvider
            .getSituacao(this.getDescricaoSituacao(edital.situacao)
            );

        return model;
    }

    /**
     * Cria a model do lote a partir do retorno da receita federal.
     * @param lote retorno do lote da receita federal.
     */
    public async createLoteModel(lote: LoteReceitaResponse): Promise<Lote> {

        const itensLote = new Array<ItemLote>();
        const model = new Lote();

        model.numero = lote.loleNrSq;
        model.permitePessoaFisica = lote.permitePF;
        model.valorMinimo = lote.valorMinimo;

        model.tipo = await this.descricoesReceitaProvider
            .getTipoLote(lote.tipo);

        model.situacao = await this.descricoesReceitaProvider
            .getSituacao(this.getDescricaoSituacao(lote.situacaoLote));

        model.orgao = await this.descricoesReceitaProvider
            .getOrgao(lote.orgao);

        // Cria as models dos itens do lote.
        for (const itemLote of lote.itensDetalhesLote) {

            const item = await this.createItemLoteModel(itemLote);
            itensLote.push(item);
        }

        model.itens = itensLote;

        return model;
    }

    /**
     * Cria a model ItemLote a partir do retorno da receita federal.
     * @param itemLote item do lote da receita federal.
     */
    private async createItemLoteModel(itemLote: ItemLoteReceitaResponse): Promise<ItemLote> {

        const model = new ItemLote();
        model.descricao = itemLote.descricao;
        model.quantidade = Number(itemLote.quantidade);
        model.unidadeMedida = itemLote.unMedida;

        model.unidadeArmazenadora = await this.descricoesReceitaProvider
            .getUnidadeArmazenadora(itemLote.recintoArmazenador);

        return model;
    }

    /**
     * Obtêm a descrição da situacao da receita.
     * @param situacao situacao da receita federal.
     */
    private getDescricaoSituacao(situacao: number): string {
        
        switch (situacao) {
            case 2: return "Próximos Editais";
            case 3: return "Aberto para propostas";
            case 4: return "Fechado para propostas";
            case 11: return "Encerrado";
            case 12: return "Homologado";
            case 14: return "Cancelado";
            case 15: return "Encerrada sessão pública";
            default: return "Situação desconhecida"
        }
    }
}