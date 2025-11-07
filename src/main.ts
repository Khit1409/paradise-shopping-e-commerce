import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

/**
 * Bootstrap the NestJS application.
 * @description Initializes and starts the server with necessary configurations.
 * @returns
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.SERVER_PORT);
  if (!port) {
    console.error('Can not get port in the .env');
    return;
  }
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.setGlobalPrefix('v1');
  await app.listen(port, '0.0.0.0');
}
/**
 * Start the application and log the service status.
 */
bootstrap()
  .then(() => {
    console.log('======== Service Status ========');
    console.table([
      {
        Service: 'API Server',
        Status: 'Running',
        Domain: 8000,
        Url: 'http://localhost:8000',
      },
      {
        Service: 'Ngrok Server',
        Status: 'Running',
        Domain: 'perspiry-promisingly-bethany.ngrok-free',
        Url: 'https://perspiry-promisingly-bethany.ngrok-free.dev',
      },
    ]);
  })
  .catch((error) => {
    console.error(`Can not running server ${error}`);
  });
