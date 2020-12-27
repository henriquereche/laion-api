import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseFilter } from "src/shared/models/abstractions/base-filter.model";
import { Edital } from "src/shared/models/edital.model";
import { Lote } from "src/shared/models/lote.model";
import { LoteSchema } from "src/shared/schemas/lote.schema";

@Resolver(of => Edital)
export class EditalResolver {

    private readonly loteModel: Model<LoteSchema>;

    public constructor(@InjectModel(LoteSchema.name) loteModel: Model<LoteSchema>) {
        this.loteModel = loteModel;
    }

    @ResolveField(returns => [Lote], { complexity: 40 })
    public async lotes(
        @Parent() edital: Edital
    ): Promise<Array<Lote>> {

        return await this.loteModel
            .find({ editalId: edital._id })
            .limit(BaseFilter.DEFAULT_LIMIT);
    }
}