import { MailerOptions } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const MailerForRootConfig = (): MailerOptions => {
  return {
    transport: {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    defaults: {
      from: '"No Reply" <no-reply@example.com>',
    },
    template: {
      dir: join(process.cwd(), 'src', 'templates'),
      adapter: new HandlebarsAdapter(),
      options: { strict: true },
    },
  };
};
