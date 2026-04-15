import { Module } from '@nestjs/common';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
} from 'nestjs-i18n';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzasModule } from './pizzas/pizzas.module';
import { BeverageModule } from './beverage/beverage.module';
import { DessertModule } from './dessert/dessert.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
// import { AuthController } from './auth/auth.controller';
// import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { OfferGalleryModule } from './offer-gallery/offer-gallery.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // database: 'pizzaria.db',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true, // usar true só em estudo
      url: process.env.DB_NEON_POSTGRES_URL,
      synchronize: true,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'pt-BR',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] }, // Ex: ?lang=en
        AcceptLanguageResolver, // Ex: Accept-Language header
        HeaderResolver,
      ],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/', // opcional
    }),
    PizzasModule,
    BeverageModule,
    DessertModule,
    OrderModule,
    UserModule,
    AuthModule,
    OfferGalleryModule,
    PaymentMethodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
