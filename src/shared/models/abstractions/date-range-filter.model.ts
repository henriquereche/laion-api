import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DateRangeFilter {

    @Field(type => Date, { nullable: true })
    public start?: Date;

    @Field(type => Date, { nullable: true })
    public end?: Date;

    public static isValid(filter: DateRangeFilter | null): boolean {

        if (filter?.start != null && filter?.end != null)
            return filter.end > filter.start;

        if (filter?.start != null || filter?.end != null)
            return true;

        return false;
    }
}