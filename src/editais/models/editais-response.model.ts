import { Field, ObjectType } from "@nestjs/graphql";
import { Edital } from "src/shared/models/edital.model";
import { PagingResponseModel } from "src/shared/models/responses/paging-response.model";

@ObjectType()
export class EditaisResponse {

    constructor(
        paging: PagingResponseModel,
        data: Edital[]
    ) {
        this.paging = paging;
        this.data = data;
    }

    @Field(type => PagingResponseModel)
    public paging: PagingResponseModel;
    
    @Field(type => [Edital])
    public data: Edital[];
}