import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './App/app.module';
import * as cors from 'cors';

async function bootstrap() {
  const express = require('express');
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  app.use(cors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, 
  }));

  await app.listen(process.env.PORT || 3000, () => {
    const port = app.get('ConfigService').get('PORT') || 3000;
    console.log(`Application is running on: http://localhost:${port}`);
  });
}
bootstrap();
