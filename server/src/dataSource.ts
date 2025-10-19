import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export default new DataSource({
  type: "mssql",
  host: process.env.SQL_HOST ?? "KIDNINE",
  port: Number(process.env.SQL_PORT),
  username: `${process.env.SQL_USERNAME}`,
  password: `${process.env.SQL_PASSWORD}`,
  database: `${process.env.SQL_DATABASENAME}`,
  synchronize: false, // Disable auto-sync for production
  logging: false,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["src/migrations/**/*.ts"],
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
});
