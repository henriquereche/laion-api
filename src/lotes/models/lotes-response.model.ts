import { Field, ObjectType } from "@nestjs/graphql";
import { Lote } from "src/shared/models/lote.model";
import { PagingResponseModel } from "src/shared/models/responses/paging-response.model";

@ObjectType()
export class LotesResponse {

    constructor(
        paging: PagingResponseModel,
        data: Lote[]
    ) {
        this.paging = paging;
        this.data = data;
    }

    @Field(type => PagingResponseModel)
    public paging: PagingResponseModel;
    
    @Field(type => [Lote])
    public data: Lote[];
}