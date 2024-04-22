import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(200)
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post('/seeder')
  @HttpCode(201)
  addCategory() {
    return this.categoriesService.preloadCategories();
  }
}
