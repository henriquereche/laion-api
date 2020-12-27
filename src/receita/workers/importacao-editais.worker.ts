import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Lote } from "src/shared/models/lote.model";
import { ImportacaoEditaisProvider } from "../providers/importacao-editais.provider";
import { ReceitaModelsFactoryProvider } from "../providers/receita-models-factory.provider";

@Injectable()
export class ImportacaoEditaisWorker {

    private readonly importacaoEditaisProvider: ImportacaoEditaisProvider;
    private readonly receitaModelsFactoryProvider: ReceitaModelsFactoryProvider;
    private readonly logger: Logger;

    constructor(
        importacaoEditaisProvider: ImportacaoEditaisProvider,
        receitaModelsFactoryProvider: ReceitaModelsFactoryProvider
    ) {
        this.importacaoEditaisProvider = importacaoEditaisProvider;
        this.receitaModelsFactoryProvider = receitaModelsFactoryProvider;
        this.logger = new Logger(ImportacaoEditaisWorker.name);
    }

    /** Cron job que realiza a importação de todos os editais e lotes da receita federal. */
    @Cron("0 0/6 * * *")
    public async start(): Promise<void> {

        this.logger.log(`Iniciando coleta editais.`);
        const editais = await this.importacaoEditaisProvider.fetchAllEditais();
        
        this.logger.log(`Iniciando atualização dos registros.`);
        for (const edital of editais) {

            const loteModels = new Array<Lote>();
            const editalModel = await this.receitaModelsFactoryProvider
                .createEditalModel(edital.edital);

            for (const lote of edital.lotes)
                loteModels.push(
                    await this.receitaModelsFactoryProvider
                        .createLoteModel(lote)
                );

            await this.importacaoEditaisProvider.saveEditalLotes({
                edital: editalModel,
                lotes: loteModels
            });
        }

        this.logger.log(`Job ${ImportacaoEditaisWorker.name} concluído.`);
    }
}