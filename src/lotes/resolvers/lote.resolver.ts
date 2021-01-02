import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Edital } from "src/shared/models/edital.model";
import { Lote } from "src/shared/models/lote.model";
import { Loader } from 'nestjs-dataloader';
import { EditaisLoader } from "../providers/editais.loader";
import { Types } from "mongoose";
import * as DataLoader from 'dataloader';

@Resolver(of => Lote)
export class LoteResolver {

    @ResolveField(returns => Edital, { complexity: 30 })
    public edital(
        @Parent() lote: Lote,
        @Loader(EditaisLoader.name) editaisLoader: DataLoader<Types.ObjectId, Edital>
    ): Promise<Edital> {

        return editaisLoader.load(lote.editalId);
    }
}