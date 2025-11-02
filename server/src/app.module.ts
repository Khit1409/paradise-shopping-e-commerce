import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "@/modules/users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsModule } from "@/modules/products/products.module";
import dotenv from "dotenv";
import { carouselSchema, NavigationSchema } from "./app.model";
import { MulterModule } from "@nestjs/platform-express";
import { CloudinaryModule } from "@/modules/cloudinaray/cloudinary.module";
import { CartsModule } from "@/modules/carts/carts.module";
import { OrdersModule } from "@/modules/orders/orders.module";
import { PaymentsModule } from "@/modules/payments/payments.module";
import { EmailsModule } from "@/modules/emails/emails.module";
import { SellerModule } from "@/modules/seller/seller.module";
import { AuthModule } from "@/modules/auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "@/modules/auth/jwt-auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { StoreEntity } from "@/modules/seller/entity/store.entity";
// import { TestProductsModule } from "./test_modules/test_products.module";
dotenv.config();

@Module({
  imports: [
    //multer
    MulterModule.register({
      dest: "./uploads",
    }),
    //jwt module
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "24h" },
      }),
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
      { name: "carousel", schema: carouselSchema },
    ]),
    //
    UsersModule,
    CloudinaryModule,
    ProductsModule,
    CartsModule,
    OrdersModule,
    PaymentsModule,
    EmailsModule,
    SellerModule,
    AuthModule,
    // TestProductsModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
