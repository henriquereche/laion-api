import { Args, Query, Resolver } from "@nestjs/graphql";
import { Edital } from "src/shared/models/edital.model";
import { EditaisFilter } from "../inputs/editais-filter.input";
import { EditaisResponse } from "../models/editais-response.model";
import { EditaisProvider } from "../providers/editais.provider";

@Resolver()
export class EditaisResolver {

    private readonly provider: EditaisProvider;

    constructor(provider: EditaisProvider) {
        this.provider = provider;
    }

    @Query(
        returns => EditaisResponse,
        { description: "Obtêm a lista de editais da receita", complexity: 30 }
    )
    public async editais(
        @Args('filter', { nullable: true }) filter: EditaisFilter
    ): Promise<EditaisResponse> {

        return await this.provider.find(filter);        
    }

    @Query(
        returns => Edital,
        { description: "Obtêm o edital por seu indentificador", complexity: 10 }
    )
    public async edital(
        @Args('id') id: string
    ): Promise<Edital> {

        return await this.provider.findById(id);
    }
}

