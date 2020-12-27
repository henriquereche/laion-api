import { Injectable, NotFoundException } from "@nestjs/common";
import { send } from "@sendgrid/mail";
import environmentProvider from "src/shared/configuration/environment.provider";
import { ConfirmInput } from "../inputs/confirm.input";
import { SubscribeInput } from "../inputs/subscribe.input";
import { UnsubscribeInput } from "../inputs/unsubscribe.input";
import { Model } from "mongoose";
import { NewsletterRegistrationSchema } from "src/shared/schemas/newsletter-registration.schema";
import { NewsletterSchema } from "src/shared/schemas/newsletter.schema";
import { InjectModel } from "@nestjs/mongoose";
import { NewsletterRegistration } from "src/shared/models/newsletter-registration.model";
import { Newsletter } from "src/shared/models/newsletter.model";
import {
    SENDGRID_EMAIL_ADDRESS,
    SENDGRID_SENDER_NAME,
    SENDGRID_TEMPLATE_SUBSCRIBE
} from "src/shared/constants/environments";

@Injectable()
export class NewsletterProvider {

    private readonly newsletterRegistrationModel: Model<NewsletterRegistrationSchema>;
    private readonly newsletterModel: Model<NewsletterSchema>;
    private readonly emailAddress: string;
    private readonly subscribeTemplate: string;
    private readonly senderName: string;

    constructor(
        @InjectModel(NewsletterRegistrationSchema.name) newsletterRegistrationModel: Model<NewsletterRegistrationSchema>,
        @InjectModel(NewsletterSchema.name) newsletterModel: Model<NewsletterSchema>
    ) {
        this.newsletterRegistrationModel = newsletterRegistrationModel;
        this.newsletterModel = newsletterModel;
        this.emailAddress = environmentProvider.getValue(SENDGRID_EMAIL_ADDRESS);
        this.subscribeTemplate = environmentProvider.getValue(SENDGRID_TEMPLATE_SUBSCRIBE);
        this.senderName = environmentProvider.getValue(SENDGRID_SENDER_NAME);
    }

    /**
     * Cria e envia um email de confirmação de cadastro na newsletter.
     * @param model 
     */
    public async subscribe(model: SubscribeInput): Promise<void> {

        const registration = new NewsletterRegistration();
        registration.emailAddress = model.email;

        await this.newsletterRegistrationModel.create(registration);

        await send({
            from: { email: this.emailAddress, name: this.senderName },
            to: model.email,
            templateId: this.subscribeTemplate,
            substitutions: { ValidationToken: registration.validationToken }
        });
    }

    /**
     * Connfirma o cadastro da newsletter.
     * @param model 
     */
    public async confirm(model: ConfirmInput): Promise<void> {

        const registration = await this.newsletterRegistrationModel
            .findOne({ validationToken: model.token });

        if (!registration)
            throw new NotFoundException(`O token '${model.token}' informado não foi encontrado.`);

        const newsletter = new Newsletter();
        newsletter.emailAddress = registration.emailAddress;

        await this.newsletterModel.create(newsletter);
        await this.newsletterRegistrationModel.remove(registration);
    }

    /**
     * Remove o cadastro da newsletter.
     * @param model 
     */
    public async unsubscribe(model: UnsubscribeInput): Promise<void> {

        const newsletter = this.newsletterModel.findOne({ unsubscriptionToken: model.token });

        if (!newsletter)
            throw new NotFoundException(`O token '${model.token}' informado não foi encontrado.`);

        await this.newsletterModel.remove(newsletter)
    }
}