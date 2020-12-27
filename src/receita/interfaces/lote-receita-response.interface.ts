import { ItemLoteReceitaResponse } from "./item-lote-receita-response.interface";

export interface LoteReceitaResponse {
    loleNrSq: number;
    edle: string;
    edital: string;
    orgao: string;
    tipo: string;
    situacaoLote: number;
    valorMinimo: number;
    permitePF: boolean;
    tipoEdital: number;
    itensDetalhesLote: ItemLoteReceitaResponse[]; 
}