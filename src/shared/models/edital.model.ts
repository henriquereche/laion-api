import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Orgao } from "./orgao.model";
import { Situacao } from "./situacao.model";

@Schema({ collection: "Edital" })
@ObjectType()
export class Edital {

    @Field(type => ID, { name: "id" })
    _id: Types.ObjectId;

    @Prop({ required: true })
    @Field()
    nome: string;

    @Prop({ required: true })
    @Field()
    codigo: string;

    @Prop({ required: true })
    @Field()
    situacao: Situacao;

    @Prop({ required: true })
    @Field()
    permitePessoaFisica: boolean;

    @Prop({ required: true })
    @Field()
    orgao: Orgao;

    @Prop({ required: true })
    @Field()
    dataInicioPropostas: Date;

    @Prop({ required: true })
    @Field()
    dataTerminoPropostas: Date;

    @Prop({ required: true })
    @Field()
    dataClassificacao: Date;

    @Prop({ required: true })
    @Field()
    contato: string;
}
