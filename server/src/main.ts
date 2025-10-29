import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

/**
 * Bootstrap the NestJS application.
 * @description Initializes and starts the server with necessary configurations.
 * @returns
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("SERVER_PORT");
  if (!port) {
    console.error("Can not get port in the .env");
    return;
  }
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.enableCors({
    origin: ["http://localhost:3000"],
    credentials: true,
  });
  app.setGlobalPrefix("v1");
  await app.listen(port);
}
/**
 * Start the application and log the service status.
 */
bootstrap()
  .then(() => {
    console.log("======== Service Status ========");
    console.table([
      {
        Service: "API Server",
        Status: "Running",
        Domain: 8000,
        Url: "http://localhost:8000",
      },
      {
        Service: "Ngrok Server",
        Status: "Running",
        Domain: "perspiry-promisingly-bethany.ngrok-free",
        Url: "https://perspiry-promisingly-bethany.ngrok-free.dev",
      },
    ]);
  })
  .catch((error) => {
    console.error(`Can not running server ${error}`);
  });
