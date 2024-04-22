import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductDbService {
  constructor(private productRepository: ProductRepository) {}

  resetProducts() {
    return this.productRepository.resetProducts();
  }

  getProductById(id: string) {
    return this.productRepository.getProductById(id);
  }

  getProducts(page: number, limit: number) {
    return this.productRepository.getProducts(page, limit);
  }

  createProduct(createProductDto: CreateProductDto) {
    return this.productRepository.createProduct(createProductDto);
  }

  updateProduct(id: string, updateProductDto: updateProductDto) {
    return this.productRepository.updateProduct(id, updateProductDto);
  }

  deleteProduct(id: string) {
    return this.productRepository.deleteProduct(id);
  }
}
