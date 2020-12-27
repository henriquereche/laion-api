import { LoteEditalReceitaResponse } from "./lote-edital-receita-reponse.interface";

export interface EditalReceitaResponse {
    edital: string;
    edle: string;
    situacao: number;
    permitePF: boolean;
    tipo: number;
    orgao: string;
    dataInicioPropostas: string;
    dataFimPropostas: string;
    dataClassificacao: string;
    dataAberturaLances: string;
    formaContato: string;
    dadosPublicacao: string;
    lotes: LoteEditalReceitaResponse[];
}