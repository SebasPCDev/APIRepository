import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../Entities/category.entity';
import { Repository } from 'typeorm';
import { loadData } from 'src/utils/loadData';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async preloadedCategories() {
    const categoryExist = await this.categoriesRepository.find();
    if (categoryExist.length === 0) {
      const data = loadData();
      const newSet = new Set<string>();
      for (const category of data) {
        newSet.add(category.category);
      }
      for await (const category of newSet) {
        const categoryExist = await this.categoriesRepository.findOne({
          where: { name: category },
        });
        if (!categoryExist) {
          await this.categoriesRepository.save({ name: category });
        }
      }
      return {
        message: 'Categories has been reset successfully',
        categories: await this.categoriesRepository.find(),
      };
    } else {
      return {
        message: 'Categories already exist',
        categories: await this.categoriesRepository.find(),
      };
    }
  }

  async getCategories() {
    return await this.categoriesRepository.find();
  }
}
