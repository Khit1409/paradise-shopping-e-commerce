import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    type: 'mssql',
    host: config.get<string>('SQL_HOST') || 'localhost',
    port: Number(config.get<string>('SQL_PORT')) || 1433,
    username: config.get<string>('SQL_USERNAME'),
    password: config.get<string>('SQL_PASSWORD'),
    database: config.get<string>('SQL_DATABASENAME'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    autoLoadEntities: true,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  }),
};
