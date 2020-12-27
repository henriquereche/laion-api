import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PagingResponseModel {

    constructor(
        page: number, 
        limit: number, 
        total: number
    ) {
        this.page = page;
        this.limit = limit;
        this.total = total;
    }

    @Field()
    public page: number;
    
    @Field()
    public limit: number;
    
    @Field()
    public total: number;
}