import { ObjectType, Field } from "@nestjs/graphql";
import { Prop } from "@nestjs/mongoose";
import { UnidadeArmazenadora } from "./unidade-armazenadora.model";

@ObjectType()
export class ItemLote {

    @Prop({ required: true })
    @Field()
    unidadeArmazenadora: UnidadeArmazenadora;

    @Prop({ required: true })
    @Field()
    quantidade: number;
    
    @Prop({ required: true })
    @Field()
    unidadeMedida: string;
    
    @Prop({ required: true })
    @Field()
    descricao: string;

    @Prop({ required: true })
    md5: string;
}