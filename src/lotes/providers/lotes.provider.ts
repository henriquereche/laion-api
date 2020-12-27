import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { BaseFilter } from "src/shared/models/abstractions/base-filter.model";
import { NumberRangeFilter } from "src/shared/models/abstractions/number-range-filter.model";
import { Lote } from "src/shared/models/lote.model";
import { PagingResponseModel } from "src/shared/models/responses/paging-response.model";
import { LoteSchema } from "src/shared/schemas/lote.schema";
import { LoteFilter } from "../inputs/lote-filter.input";
import { LotesResponse } from "../models/lotes-response.model";

@Injectable()
export class LotesProvider {

    private readonly loteModel: Model<LoteSchema>;

    constructor(@InjectModel(LoteSchema.name) loteModel: Model<LoteSchema>) {
        this.loteModel = loteModel;
    }

    /**
     * Obtêm o lote por id.
     * @param id identificador do lote.
     */
    public async findById(id: string): Promise<Lote> {

        return await this.loteModel.findById(id);
    }

    /**
     * Obtêm a lista de Lotes da receita a partir do filtro.
     * @param filter filtro dos lotes.
     */
    public async find(filter: LoteFilter): Promise<LotesResponse> {

        if (filter == null) {

            const count = await this.loteModel.countDocuments();
            const data = await this.loteModel
                .find()
                .limit(BaseFilter.DEFAULT_LIMIT);

            return new LotesResponse(
                new PagingResponseModel(
                    BaseFilter.DEFAULT_PAGE, 
                    BaseFilter.DEFAULT_LIMIT, 
                    count
                ),
                data
            );
        }

        const findObject: any = {};

        if (filter.edital?.length > 0)
            findObject['editalId'] = {
                '$in': filter.edital.map(x => Types.ObjectId(x))
            };

        if (filter.numero?.length > 0)
            findObject['numero'] = { '$in': filter.numero };

        if (filter.orgao?.length > 0)
            findObject['orgao._id'] = {
                '$in': filter.orgao.map(x => Types.ObjectId(x))
            };

        if (filter.permitePessoaFisica == true)
            findObject['permitePessoaFisica'] = true;

        if (filter.situacao?.length > 0)
            findObject['situacao._id'] = {
                '$in': filter.situacao.map(x => Types.ObjectId(x))
            };

        if (filter.tipo?.length > 0)
            findObject['tipo._id'] = {
                '$in': filter.tipo.map(x => Types.ObjectId(x))
            };

        if (filter.unidadeArmazenadora?.length > 0)
            findObject['itens.unidadeArmazenadora._id'] = {
                '$in': filter.unidadeArmazenadora.map(x => Types.ObjectId(x))
            };

        if (NumberRangeFilter.isValid(filter.valorMinimo)) {

            const nestedNumberFilter: any = {};

            if (filter.valorMinimo.start)
                nestedNumberFilter["$gte"] = filter.valorMinimo.start;

            if (filter.valorMinimo.end)
                nestedNumberFilter["$lte"] = filter.valorMinimo.end;

            findObject['valorMinimo'] = nestedNumberFilter;
        }

        const count = await this.loteModel
            .find(findObject)
            .countDocuments();

        const data = await this.loteModel
            .find(findObject)
            .skip((filter.page - 1) * filter.limit)
            .limit(filter.limit);

        return new LotesResponse(
            new PagingResponseModel(
                filter.page, 
                filter.limit, 
                count
            ),
            data
        );
    }
}