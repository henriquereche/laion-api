<p align="center">
  <img src="https://i.ibb.co/nPMVxW6/logo.png" height=150 />
</p>
<p align="center">Laion API</p>
<p align="center">Não perca mais os leilões da Receita Federal.</p>

[![Build Status](https://dev.azure.com/hnreche/Laion/_apis/build/status/Laion%20API?branchName=main)](https://dev.azure.com/hnreche/Laion/_build/latest?definitionId=5&branchName=main)

# Descrição

Projeto construido em cima do framework [NestJS](https://github.com/nestjs/nest) para coleta e disponibilização de editais e lotes públicos da Receita Federal.

# Instalação

```bash
$ npm install
```

# Uso

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Configuração

```
PORT=3000                                   # Porta da aplicação.
SENDGRID_API_KEY=SG.DtTcMo2MTKSLK...        # Chave API Sendgrid.
SENDGRID_EMAIL_ADDRESS=laion@email.com      # Email remetente notificações.
SENDGRID_SENDER_NAME=Laion                  # Usuário remetente 
SENDGRID_TEMPLATE_SUBSCRIBE=d-aad6e9...     # Template dinâmico do cadastro newsletter.
SENDGRID_TEMPLATE_UPDATE=d-f3e092892...     # Template dinâmico novas atualizações.
MONGODB_CONNECTION=mongodb://localhost      # Connection string MongoDB
MONGODB_DATABASE=laion                      # Database do MongoDB
```