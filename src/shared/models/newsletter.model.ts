import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { v4 } from "uuid";

@Schema({ collection: "Newsletter" })
export class Newsletter {

    id: Types.ObjectId;

    @Prop({ required: true })
    emailAddress: string;
    
    @Prop({ required: true, default: () => Date() })
    creationDate: Date;
    
    @Prop({ required: true, default: () => v4() })
    unsubscriptionToken: string;
}