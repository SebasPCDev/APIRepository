import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './category.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getCategories() {
    return this.categoriesRepository.getCategories();
  }

  preloadCategories() {
    return this.categoriesRepository.preloadedCategories();
  }
}
