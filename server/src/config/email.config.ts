import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

type EmailConfigParam = {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
};
/**
 *
 * @param param0
 * @returns
 */
export const emailConfig = ({ auth, host, port }: EmailConfigParam) => {
  return {
    transport: {
      host,
      port,
      secure: port === 465,
      auth,
    },
    defaults: {
      from: '"Paradise Shop" <no-reply@paradise.com>',
    },
    template: {
      dir: join(
        process.cwd(),
        "src",
        "emails",
        "templates"
      ),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  };
};
