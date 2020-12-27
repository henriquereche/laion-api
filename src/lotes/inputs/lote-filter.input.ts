import { Field, InputType, Int } from "@nestjs/graphql";
import { BaseFilter } from "src/shared/models/abstractions/base-filter.model";
import { NumberRangeFilter } from "src/shared/models/abstractions/number-range-filter.model";

@InputType()
export class LoteFilter extends BaseFilter {

    @Field(type => [Int], { nullable: true })
    public numero?: number[];

    @Field(type => [String], { nullable: true })
    public edital?: string[];

    @Field(type => [String], { nullable: true })
    public orgao?: string[];

    @Field(type => [String], { nullable: true })
    public tipo?: string[];

    @Field(type => [String], { nullable: true })
    public situacao?: string[];

    @Field(type => NumberRangeFilter, { nullable: true })
    public valorMinimo?: NumberRangeFilter;

    @Field(type => Boolean, { nullable: true })
    public permitePessoaFisica?: boolean;

    @Field(type => [String], { nullable: true })
    public unidadeArmazenadora?: string[];
}