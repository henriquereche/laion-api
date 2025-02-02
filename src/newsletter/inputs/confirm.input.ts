import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class ConfirmInput {
    
    @Field()
    @IsNotEmpty()
    token: string;
}