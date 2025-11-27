import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from '@/config/database/typeorm.config';
import { mongoodbConfig } from '@/config/database/mongodb.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@/modules/auth.module';
import { ProductModule } from '@/modules/product.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/guard/jwt-authguard';
import { JwtService } from '@nestjs/jwt';
import { CartModule } from '@/modules/cart.module';
import { UIModule } from '@/modules/ui.module';
import { OrderModule } from '@/modules/order.module';
import { DatabaseModule } from '@/modules/database.module';
import { CloudinaryModule } from '@/modules/cloudinary.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerForRootConfig } from '@/config/mailer/mailer.module.config';
import { SellerModule } from './modules/seller.module';
import { NotificationModule } from './modules/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    MongooseModule.forRootAsync(mongoodbConfig),
    MailerModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => MailerForRootConfig(),
    }),
    DatabaseModule,
    //other module
    AuthModule,
    ProductModule,
    CartModule,
    UIModule,
    OrderModule,
    DatabaseModule,
    CloudinaryModule,
    SellerModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    JwtService,
  ],
})
export class AppModule {}
