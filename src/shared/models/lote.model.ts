import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { ItemLote } from "./item-lote.model";
import { Orgao } from "./orgao.model";
import { Situacao } from "./situacao.model";
import { TipoLote } from "./tipo-lote.model";
import { Types } from 'mongoose';

@Schema({ collection: "Lote" })
@ObjectType()
export class Lote {

    @Field(type => ID, { name: "id" })
    _id: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        required: true
    })
    @Field(type => ID)
    editalId: Types.ObjectId;

    @Prop({ required: true })
    @Field()
    numero: number;

    @Prop({ required: true })
    @Field()
    orgao: Orgao;

    @Prop({ required: true })
    @Field()
    tipo: TipoLote;

    @Prop({ required: true })
    @Field()
    situacao: Situacao;

    @Prop({ required: true })
    @Field()
    valorMinimo: number;

    @Prop({ required: true })
    @Field()
    permitePessoaFisica: boolean;

    @Prop()
    @Field(type => [ItemLote])
    itens: ItemLote[];

    @Prop({ required: true })
    md5: string;
}