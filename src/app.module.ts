import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LotesModule } from './lotes/lotes.module';
import { EditaisModule } from './editais/editais.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ComplexityPlugin } from './shared/plugins/complexity.plugin';
import { NewsletterModule } from './newsletter/newsletter.module';
import { MongooseModule } from '@nestjs/mongoose';
import environmentProvider from './shared/configuration/environment.provider';
import { ReceitaModule } from './receita/receita.module';
import { ScheduleModule } from '@nestjs/schedule';
import {
  MONGODB_CONNECTION,
  MONGODB_DATABASE
} from './shared/constants/environments';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(
      environmentProvider.getValue(MONGODB_CONNECTION),
      { dbName: environmentProvider.getValue(MONGODB_DATABASE) }
    ),
    LotesModule,
    EditaisModule,
    NewsletterModule,
    ReceitaModule,
  ],
  controllers: [AppController],
  providers: [ComplexityPlugin],
})
export class AppModule { }
