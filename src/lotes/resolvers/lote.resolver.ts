import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Edital } from "src/shared/models/edital.model";
import { Lote } from "src/shared/models/lote.model";
import { EditalSchema } from "src/shared/schemas/edital.schema";

@Resolver(of => Lote)
export class LoteResolver {

    private readonly editalModel: Model<EditalSchema>;

    public constructor(@InjectModel(EditalSchema.name) editalModel: Model<EditalSchema>) {

        this.editalModel = editalModel;
    }

    @ResolveField(returns => Edital, { complexity: 30 })
    public async edital(
        @Parent() lote: Lote
    ): Promise<Edital> {

        return await this.editalModel.findById(lote.editalId);
    }
}