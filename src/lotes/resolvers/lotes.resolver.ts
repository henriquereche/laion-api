import { Args, Query, Resolver } from "@nestjs/graphql";
import { Lote } from "src/shared/models/lote.model";
import { LoteFilter } from "../inputs/lote-filter.input";
import { LotesResponse } from "../models/lotes-response.model";
import { LotesProvider } from "../providers/lotes.provider";

@Resolver()
export class LotesResolver {

    private readonly provider: LotesProvider;

    constructor(provider: LotesProvider) {

        this.provider = provider;
    }

    @Query(
        () => LotesResponse,
        { description: "Obtêm os lotes do edital.", complexity: 30 }
    )
    public async lotes(
        @Args('filter', { nullable: true }) filter: LoteFilter
    ): Promise<LotesResponse> {

        return await this.provider.find(filter);
    }

    @Query(
        () => Lote,
        { description: "Obtêm o lote por seu identificador.", complexity: 10 }
    )
    public async lote(
        @Args('id') id: string
    ): Promise<Lote> {

        return await this.provider.findById(id);
    }
}