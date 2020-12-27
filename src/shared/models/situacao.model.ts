import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ collection: "Situacao" })
@ObjectType()
export class Situacao {

    @Field(type => ID, { name: "id" })
    _id: Types.ObjectId;

    @Prop({ required: true })
    @Field()
    descricao: string;
}