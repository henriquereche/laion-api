import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class BaseFilter {

    public static DEFAULT_PAGE = 1;
    public static DEFAULT_LIMIT = 10;
    public static MAXIMUM_LIMIT = 100;

    private _page?: number;

    public get page(): number {
        return this._page ?? BaseFilter.DEFAULT_PAGE;
    } 

    @Field(type => Int, { nullable: true })
    public set page(value: number | null) {
        this._page = value != null
            ? value < 0
                ? 0
                : value
            : BaseFilter.DEFAULT_PAGE;
    }

    private _limit?: number;

    public get limit(): number {
        return this._limit ?? BaseFilter.DEFAULT_LIMIT;
    }

    @Field(type => Int, { nullable: true })
    public set limit(value: number | null) {
        this._limit = value != null
            ? value > BaseFilter.MAXIMUM_LIMIT
                ? BaseFilter.MAXIMUM_LIMIT
                : value <= 0 ? 1 : value
            : BaseFilter.DEFAULT_LIMIT;
    }
}