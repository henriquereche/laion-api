import { Model } from "mongoose";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Lote } from "src/shared/models/lote.model";
import { Edital } from "src/shared/models/edital.model";
import { LoteSchema } from "src/shared/schemas/lote.schema";
import { EditalSchema } from "src/shared/schemas/edital.schema";
import { ReceitaFederalProvider } from "./receita-federal.provider";
import { LoteReceitaResponse } from "../interfaces/lote-receita-response.interface";
import { EditalReceitaResponse } from "../interfaces/edital-receita-response.interface";
import { EditalSituacaoEditaisDisponiveisReceitaResponse } from "../interfaces/edital-situacao-editais-disponiveis-receita-response.interface";

export type EditalLotesReceita = {
    edital: EditalReceitaResponse,
    lotes: LoteReceitaResponse[]
}

export type EditalLotes = {
    edital: Edital,
    lotes: Lote[]
}

@Injectable()
export class ImportacaoEditaisProvider {

    private readonly receitaFederalProvider: ReceitaFederalProvider;
    private readonly editalModel: Model<EditalSchema>;
    private readonly loteModel: Model<LoteSchema>;
    private readonly logger: Logger;

    constructor(
        receitaFederalProvider: ReceitaFederalProvider,
        @InjectModel(EditalSchema.name) editalModel: Model<EditalSchema>,
        @InjectModel(LoteSchema.name) loteModel: Model<LoteSchema>
    ) {
        this.receitaFederalProvider = receitaFederalProvider;
        this.editalModel = editalModel;
        this.loteModel = loteModel;
        this.logger = new Logger(ImportacaoEditaisProvider.name);
    }

    /**
     * Cria ou atualiza o edital e seus lotes.
     * @param editalLotes edital e lotes recebidos da receita federal.
     */
    public async saveEditalLotes(editalLotes: EditalLotes): Promise<void> {

        let edital = await this.editalModel
            .findOne({ codigo: editalLotes.edital.codigo });

        // Altera o edital existente.
        if (edital != null) {

            edital.situacao = editalLotes.edital.situacao;
            edital.permitePessoaFisica = editalLotes.edital.permitePessoaFisica;
            edital.orgao = editalLotes.edital.orgao;
            edital.dataInicioPropostas = editalLotes.edital.dataInicioPropostas;
            edital.dataTerminoPropostas = editalLotes.edital.dataTerminoPropostas;
            edital.dataClassificacao = editalLotes.edital.dataClassificacao;
            edital.contato = editalLotes.edital.contato;

            await this.editalModel.updateOne(
                { codigo: edital.codigo },
                edital
            );
        }

        // Cria o edital.
        else {

            edital = new this.editalModel(editalLotes.edital);
            await edital.save();
        }

        // Atualiza ou cria os editais do lote.
        for (const loteEdital of editalLotes.lotes)
            await this.saveLoteItens(
                edital, 
                loteEdital
            );
    }

    /** Obtêm a relação de todos os editais com seus lotes. */
    public async fetchAllEditais(): Promise<Array<EditalLotesReceita>> {

        const response = new Array<EditalLotesReceita>();

        // Consulta na receita todos os editais disponíveis.
        const editaisDisponiveis = await this.receitaFederalProvider.fetchEditaisDisponiveis();
        const todosEditais = editaisDisponiveis.situacoes.reduce(
            (aggregator, situacao) => {
                situacao.lista.forEach(edital => aggregator.push(edital));
                return aggregator;
            },
            new Array<EditalSituacaoEditaisDisponiveisReceitaResponse>()
        );

        for (const editalDisponivel of todosEditais) {

            // Consulta individualmente o edital e seus lotes.
            try {
                
                const edital = await this.receitaFederalProvider.fetchEdital(editalDisponivel.edital);
                const lotes = new Array<LoteReceitaResponse>();

                for (const loteEdital of edital.lotes) {

                    try {
                        
                        const lote = await this.receitaFederalProvider.fetchLote(
                            editalDisponivel.edital,
                            loteEdital.loleNrSq
                        );
    
                        lotes.push(lote);

                    } catch (error) {

                        this.logger.error(`Falha ao consultar o lote ${editalDisponivel.edle}/${loteEdital.loleNrSq}.`);
                    }
                }

                response.push({
                    edital: edital,
                    lotes: lotes
                });

            } catch (error) {

                this.logger.error(`Falha ao consultar o edital ${editalDisponivel.edle}.`);
            }
        }

        return response;
    }

    /**
     * Cria ou altera o lote da receita.
     * @param edital edital pai do lote.
     * @param lote lote mapeado da receita federal.
     */
    private async saveLoteItens(
        edital: EditalSchema,
        lote: Lote
    ): Promise<void> {

        const updateLote: Lote = await this.loteModel
            .findOne({ editalId: edital._id, numero: lote.numero });

        // Atualiza o lote existente.
        if (updateLote != null) {

            updateLote.orgao = lote.orgao;
            updateLote.permitePessoaFisica = lote.permitePessoaFisica;
            updateLote.situacao = lote.situacao;
            updateLote.tipo = lote.tipo;
            updateLote.valorMinimo = lote.valorMinimo;
            updateLote.itens = lote.itens;

            await this.loteModel.updateOne(
                { editalId: edital._id, numero: lote.numero },
                updateLote
            );
        }

        // Cria o novo lote.
        else {

            lote.editalId = edital._id;

            const createdLote = new this.loteModel(lote);
            await createdLote.save();
        }
    }
}
