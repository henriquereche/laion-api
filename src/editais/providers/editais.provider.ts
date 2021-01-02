import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { BaseFilter } from "src/shared/models/abstractions/base-filter.model";
import { DateRangeFilter } from "src/shared/models/abstractions/date-range-filter.model";
import { Edital } from "src/shared/models/edital.model";
import { PagingResponseModel } from "src/shared/models/responses/paging-response.model";
import { EditalSchema } from "src/shared/schemas/edital.schema";
import { EditaisFilter } from "../inputs/editais-filter.input";
import { EditaisResponse } from "../models/editais-response.model";

@Injectable()
export class EditaisProvider {

    private readonly editalModel: Model<EditalSchema>;

    constructor(@InjectModel(EditalSchema.name) editalModel: Model<EditalSchema>) {
        this.editalModel = editalModel;
    }

    /**
     * Consulta o edital por seu identificador.
     * @param id identificador do edital.
     */
    public async findById(id: string): Promise<Edital> {

        return await this.editalModel.findById(id);
    }

    /**
     * Obtêm a listagem de editais pelo filtro.
     * @param filter filtro de editais.
     * @param countDocuments obtêm a contagem total de documentos.
     */
    public async find(
        filter: EditaisFilter,
        countDocuments: boolean = false
    ): Promise<EditaisResponse> {

        if (filter == null) {

            const count = countDocuments
                ? await this.editalModel.countDocuments()
                : 0;

            const data = await this.editalModel
                .find()
                .limit(BaseFilter.DEFAULT_LIMIT);

            return new EditaisResponse(
                new PagingResponseModel(
                    BaseFilter.DEFAULT_PAGE,
                    BaseFilter.DEFAULT_LIMIT,
                    count
                ),
                data
            );
        }

        const findObject: any = {};

        if (filter.permitePessoaFisica == true)
            findObject['permitePessoaFisica'] = true;

        if (filter.codigo?.length > 0)
            findObject['codigo'] = { '$in': filter.codigo };

        if (filter.situacao?.length > 0)
            findObject['situacao._id'] = {
                '$in': filter.situacao.map(x => Types.ObjectId(x))
            };

        if (filter.orgao?.length > 0)
            findObject['orgao._id'] = {
                '$in': filter.orgao.map(x => Types.ObjectId(x))
            };

        if (DateRangeFilter.isValid(filter.dataInicioPropostas)) {

            const nestedDateFilter: any = {};

            if (filter.dataInicioPropostas.start)
                nestedDateFilter["$gte"] = filter.dataInicioPropostas.start;

            if (filter.dataInicioPropostas.end)
                nestedDateFilter["$lte"] = filter.dataInicioPropostas.end;

            findObject['dataInicioPropostas'] = nestedDateFilter;
        }

        if (DateRangeFilter.isValid(filter.dataTerminoPropostas)) {

            const nestedDateFilter: any = {};

            if (filter.dataTerminoPropostas.start)
                nestedDateFilter["$gte"] = filter.dataTerminoPropostas.start;

            if (filter.dataTerminoPropostas.end)
                nestedDateFilter["$lte"] = filter.dataTerminoPropostas.end;

            findObject['dataTerminoPropostas'] = nestedDateFilter;
        }

        if (DateRangeFilter.isValid(filter.dataClassificacao)) {

            const nestedDateFilter: any = {};

            if (filter.dataClassificacao.start)
                nestedDateFilter["$gte"] = filter.dataClassificacao.start;

            if (filter.dataClassificacao.end)
                nestedDateFilter["$lte"] = filter.dataClassificacao.end;

            findObject['dataClassificacao'] = nestedDateFilter;
        }

        const count = countDocuments 
            ? await this.editalModel
                .find(findObject)
                .countDocuments()
            : 0;

        const pagingArgs = BaseFilter.getPagingArgs(filter);

        const data = await this.editalModel
            .find(findObject)
            .skip((pagingArgs.page - 1) * pagingArgs.limit)
            .limit(pagingArgs.limit);

        return new EditaisResponse(
            new PagingResponseModel(
                pagingArgs.page,
                pagingArgs.limit,
                count
            ),
            data
        );
    }
}