import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NumberRangeFilter {

    @Field(type => Number, { nullable: true })
    public start?: number;

    @Field(type => Number, { nullable: true })
    public end?: number;

    public static isValid(filter: NumberRangeFilter | null): boolean {

        if (filter?.start != null && filter?.end != null)
            return filter.end > filter.start;

        if (filter?.start != null || filter?.end != null)
            return true;

        return false;
    }
}