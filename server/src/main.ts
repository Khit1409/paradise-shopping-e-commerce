import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("SERVER_PORT");
  if (!port) {
    console.error("Can not get port in the .env");
    return;
  }
  /*@typescript-eslint/no-unsafe-call*/
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.enableCors({
    origin: ["http://localhost:3000"],
    credentials: true,
  });
  app.setGlobalPrefix("v1");
  await app.listen(port);
}
bootstrap()
  .then(() => {
    console.log(
      "Server is running on local: http://localhost:8000 and ngrok: https://perspiry-promisingly-bethany.ngrok-free.dev",
    );
  })
  .catch((error) => {
    console.error(`Can not running server ${error}`);
  });
