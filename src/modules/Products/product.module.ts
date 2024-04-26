import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductDbService } from './productdb.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../Entities/product.entity';
import { Category } from '../../Entities/category.entity';
import { User } from 'src/Entities/user.entity';

@Module({
  providers: [ProductDbService, ProductRepository],
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Category, Product, User])],
})
export class ProductsModule {
  constructor(private readonly productRepository: ProductRepository) {}

  async onModuleInit() {
    console.log('Loading products...');
    await this.productRepository.preloadedProducts();
  }
}
