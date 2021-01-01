import { Field, InputType, Int } from "@nestjs/graphql";

export interface PagingArgs {
    page: number;
    limit: number;
}

@InputType()
export class BaseFilter {

    public static DEFAULT_PAGE = 1;
    public static DEFAULT_LIMIT = 10;
    public static MAXIMUM_LIMIT = 50;

    @Field(type => Int, { nullable: true })
    private page?: number;

    @Field(type => Int, { nullable: true })
    private limit?: number;

    /**
     * Obtêm os valores de paginação.
     * @param filter filtro base de paginação.
     */
    public static getPagingArgs(filter: BaseFilter) : PagingArgs {

        const pageValue = filter.page ?? BaseFilter.DEFAULT_PAGE;
        const page = pageValue < 1 
            ? BaseFilter.DEFAULT_PAGE 
            : pageValue;

        const limitValue = filter.limit ?? BaseFilter.DEFAULT_LIMIT;
        const limit = limitValue < 1 ? 1 
            : limitValue > BaseFilter.MAXIMUM_LIMIT 
                ? BaseFilter.MAXIMUM_LIMIT 
                : limitValue;

        return {
            limit: limit,
            page: page
        };
    }
}