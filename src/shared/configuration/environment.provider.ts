require('dotenv').config();

/** Wrapper para uso de variáveis de ambiente */
class EnvironmentProvider {

    private readonly enviroments: {
        [key: string]: string | undefined;
    };

    constructor() {
        this.enviroments = process.env;
    }

    /**
     * Obtêm uma variável de ambiente da aplicação.
     * @param key chave da variável de ambiente.
     * @param require indica se a variável de ambiente é obrigatória.
     * @returns valor da variável de ambiente.
     */
    getValue(key: string, require = true): string {

        const value = this.enviroments[key];

        if (!value && require)
            throw new Error(`Missing environment variable '${key}'.`);

        return value;
    }
}

export default new EnvironmentProvider();