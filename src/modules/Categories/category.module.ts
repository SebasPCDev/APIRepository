import { Module } from '@nestjs/common';
import { Category } from '../../Entities/category.entity';
import { CategoriesController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './category.service';
import { CategoriesRepository } from './category.repository';

@Module({
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoriesModule {
  constructor(private readonly categoriesService: CategoriesService) {}

  async onModuleInit() {
    console.log('Loading categories...');
    await this.categoriesService.preloadCategories();
  }
}
