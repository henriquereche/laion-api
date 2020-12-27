import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  index(): string {
    return 'API is up and running!';
  }
}
