import { Field, InputType } from "@nestjs/graphql";
import { BaseFilter } from "src/shared/models/abstractions/base-filter.model";
import { DateRangeFilter } from "src/shared/models/abstractions/date-range-filter.model";

@InputType()
export class EditaisFilter extends BaseFilter {

    @Field({ nullable: true })
    public permitePessoaFisica?: boolean;
    
    @Field(type => [String], { nullable: true })
    public codigo?: string[];

    @Field(type => [String], { nullable: true })
    public orgao?: string[];

    @Field(type => [String], { nullable: true })
    public situacao?: string[];

    @Field(type => DateRangeFilter, { nullable: true })
    dataInicioPropostas?: DateRangeFilter;

    @Field(type => DateRangeFilter, { nullable: true })
    dataTerminoPropostas?: DateRangeFilter;

    @Field(type => DateRangeFilter, { nullable: true })
    dataClassificacao?: DateRangeFilter;
}