import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/Products/product.module';
import { UsersModule } from './modules/Users/user.module';
import { AuthModule } from './modules/Auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './modules/Categories/category.module';
import { OrdersModule } from './modules/orders/orders.module';
import { UploadFilesModule } from './modules/UploadFiles/upload-files.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UploadFilesModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
