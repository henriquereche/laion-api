import { setApiKey } from "@sendgrid/mail";
import { SENDGRID_API_KEY } from "../constants/environments";
import environmentProvider from "./environment.provider";

/** Realiza as configurações de uso do SendGrid. */
export class SendGridLoader {

    static initialize() {
        
        const apiKey = environmentProvider.getValue(SENDGRID_API_KEY);
        setApiKey(apiKey);
    }
}