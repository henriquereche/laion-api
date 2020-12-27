import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { v4 } from 'uuid';

@Schema({ collection: "NewsletterRegistration" })
export class NewsletterRegistration {

    _id: Types.ObjectId;

    @Prop({ required: true })
    emailAddress: string;

    @Prop({ 
        required: true, 
        default: () => Date(), 
        expires: 172800,
    })
    creationDate: Date;

    @Prop({ required: true, default: () => v4() })
    validationToken: string;
}