import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UnsubscribeInput {
    
    @Field()
    @IsNotEmpty()
    token: string;
}