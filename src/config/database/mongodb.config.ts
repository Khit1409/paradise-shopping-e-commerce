import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongoodbConfig: MongooseModuleAsyncOptions = {
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    uri: config.get<string>('MONGOO_URL'),
  }),
};
