import { HttpService, Injectable } from "@nestjs/common";
import { EditaisDisponiveisReceitaResponse } from "../interfaces/editais-disponiveis-receita-response.interface";
import { EditalReceitaResponse } from "../interfaces/edital-receita-response.interface";
import { LoteReceitaResponse } from "../interfaces/lote-receita-response.interface";

const BASE_PATH = "http://www25.receita.fazenda.gov.br/sle-sociedade/api";

@Injectable()
export class ReceitaFederalProvider {

    private readonly httpService: HttpService;

    constructor(httpService: HttpService) {

        this.httpService = httpService;
        this.httpService.axiosRef.defaults.baseURL = BASE_PATH;
        this.httpService.axiosRef.defaults.headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'laion-api-service'
        };
    }

    /** Obtêm a lista de editais disponiveis da receita. */
    public async fetchEditaisDisponiveis(): Promise<EditaisDisponiveisReceitaResponse> {

        const response = await this.httpService
            .get("/editais-disponiveis")
            .toPromise();

        return response.data;
    }

    /**
     * Obtêm o edital por seu código.
     * @param codigo código do edital ex: "817700/7/2020".
     */
    public async fetchEdital(codigo: string): Promise<EditalReceitaResponse> {

        const response = await this.httpService
            .get<EditalReceitaResponse>(`/edital/${codigo}`)
            .toPromise();

        return response.data;
    }

    /**
     * Consulta o lote do edital por seu código e número.
     * @param codigo código do edital ex: "817700/7/2020".
     * @param numero número de sequencia do lote ex: "12".
     */
    public async fetchLote(
        codigo: string, 
        numero: string | number
    ): Promise<LoteReceitaResponse> {

        const response = await this.httpService
            .get<LoteReceitaResponse>(`/lote/${codigo}/${numero}`)
            .toPromise();

        return response.data;
    }
}
