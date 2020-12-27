import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import environmentProvider from './shared/configuration/environment.provider';
import { SendGridLoader } from './shared/configuration/sendgrid.loader';
import { PORT } from './shared/constants/environments';

import * as rateLimit from 'express-rate-limit';

const LISTEN_PORT = environmentProvider
  .getValue(PORT, false) || 3000;

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: console
  });

  // Global pipes.
  app.useGlobalPipes(new ValidationPipe());
  app.use(rateLimit({ windowMs: 60000, max: 50 }));

  // Initialization.
  SendGridLoader.initialize();

  await app.listen(LISTEN_PORT, () => {

    const appPath = `http://localhost:${LISTEN_PORT}`;

    console.log(`Application is running at: ${appPath}`);
    console.log(`GraphQL playground: ${appPath}/graphql`);
  });
}
bootstrap();
