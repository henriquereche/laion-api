import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Edital } from "src/shared/models/edital.model";
import { Lote } from "src/shared/models/lote.model";
import { Loader } from "nestjs-dataloader";
import { Types } from "mongoose";
import { LotesLoader } from "../providers/lotes.loader";
import * as DataLoader from 'dataloader';

@Resolver(of => Edital)
export class EditalResolver {

    @ResolveField(returns => [Lote], { complexity: 40 })
    public lotes(
        @Parent() edital: Edital,
        @Loader(LotesLoader.name) lotesLoader: DataLoader<Types.ObjectId, Lote[]>
    ): Promise<Array<Lote>> {

        return lotesLoader.load(edital._id);
    }
}