import { Module } from "@nestjs/common";
import { EmailsService } from "./emails.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailsController } from "./emails.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>("EMAIL_HOST")!,
          port: config.get<number>("EMAIL_PORT")!,
          secure: false,
          auth: {
            user: config.get<string>("EMAIL_USER")!,
            pass: config.get<string>("EMAIL_PASS")!,
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@example.com>',
        },
        template: {
          dir: join(process.cwd(), "src", "emails", "templates"),
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
    }),
  ],
  controllers: [EmailsController],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
