import { EditalSituacaoEditaisDisponiveisReceitaResponse } from "./edital-situacao-editais-disponiveis-receita-response.interface";

export interface SituacaoEditalDisponivelReceitaReponse {
    situacao: number;
    editaisEstaoLimitados: boolean;
    lista: EditalSituacaoEditaisDisponiveisReceitaResponse[];
}