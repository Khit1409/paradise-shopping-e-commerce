import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import dotenv from "dotenv";

dotenv.config();

export const sqlServerConfig: TypeOrmModuleOptions | undefined = {
  type: "mssql",
  host: process.env.SQL_HOST ?? "KIDNINE",
  port: Number(process.env.SQL_PORT),
  username: `${process.env.SQL_USERNAME}`,
  password: `${process.env.SQL_PASSWORD}`,
  database: `${process.env.SQL_DATABASENAME}`,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: true,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
