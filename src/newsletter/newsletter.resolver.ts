import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ConfirmInput } from "./inputs/confirm.input";
import { SubscribeInput } from "./inputs/subscribe.input";
import { UnsubscribeInput } from "./inputs/unsubscribe.input";
import { NewsletterProvider } from "./providers/newsletter.provider";

@Resolver()
export class NewsletterResolver {

    private readonly newsletterProvider: NewsletterProvider;

    constructor(newsletterProvider: NewsletterProvider) {
        this.newsletterProvider = newsletterProvider;
    }

    @Mutation(
        () => Boolean, 
        { description: "Solicita o cadastro na newsletter para o e-mail informado.", complexity: 10 }
    )
    public async subscribe(@Args('input') input: SubscribeInput) {

        await this.newsletterProvider.subscribe(input);
        return true;
    }

    @Mutation(
        () => Boolean,
        { description: "Confirma o cadastro na newsletter a partir do token de confirmação.", complexity: 10 }
    )
    public async confirm(@Args('input') input: ConfirmInput) {

        await this.newsletterProvider.confirm(input);
        return true;
    }

    @Mutation(
        () => Boolean,
        { description: "Cancela o cadastro na newsletter a partir do token.", complexity: 10 }
    )
    public async unsubscribe(@Args('input') input: UnsubscribeInput) {

        await this.newsletterProvider.unsubscribe(input);
        return true;
    }
}
