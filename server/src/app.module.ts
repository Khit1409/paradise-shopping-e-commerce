import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ServerLoaded } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { StoreModule } from "./store/store.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsModule } from "./products/products.module";
import dotenv from "dotenv";
import { NavigationSchema } from "./app.model";
import { MulterModule } from "@nestjs/platform-express";
import { CloudinaryModule } from "./cloudinaray/cloudinary.module";
import { CartsModule } from "./carts/carts.module";
import { OrdersModule } from "./orders/orders.module";
import { PaymentsModule } from "./payments/payments.module";
dotenv.config();

@Module({
  imports: [
    //multer
    MulterModule.register({
      dest: "./uploads",
    }),
    //root config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    // kết nối sql server
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "mssql",
        host: config.get<string>("SQL_HOST") || "localhost",
        port: Number(config.get<string>("SQL_PORT")) || 1433,
        username: config.get<string>("SQL_USERNAME"),
        password: config.get<string>("SQL_PASSWORD"),
        database: config.get<string>("SQL_DATABASENAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: false,
        autoLoadEntities: true,
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
      }),
    }),
    //mongoodb
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>("MONGOO_URL"),
      }),
    }),
    MongooseModule.forFeature([
      { name: "navigations", schema: NavigationSchema },
    ]),
    //
    StoreModule,
    UsersModule,
    CloudinaryModule,
    ProductsModule,
    CartsModule,
    OrdersModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [ServerLoaded],
})
export class AppModule {}
