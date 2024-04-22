import { Injectable } from '@nestjs/common';
import { Product } from '../../Entities/product.entity';
import { Category } from '../../Entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { loadData } from 'src/utils/loadData';
import { updateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async resetProducts() {
    const products = await this.productRepository.find();

    products.forEach(async (product) => {
      await this.productRepository.update(product.id, { stock: 12 });
    });

    return {
      message: 'Products has been reseted',
    };
  }

  async preloadedProducts() {
    const categoryExist = await this.categoryRepository.find();
    if (categoryExist.length === 0) {
      throw new Error('Categories not found');
    }
    const products = loadData();
    const imageExample = 'https://via.placeholder.com/150';
    const producsComplete = products.map((product) => {
      if (!product.image || product.image === '') {
        return {
          ...product,
          image: imageExample,
        };
      }
    });
    for (const product of producsComplete) {
      const category = await this.categoryRepository.findOne({
        where: { name: product.category },
      });
      const productExist = await this.productRepository.findOne({
        where: { name: product.name },
      });
      if (!productExist) {
        await this.productRepository.save({ ...product, category });
      }
    }
    return await this.productRepository.find({ relations: ['category'] });
  }

  async getProducts(page: number, limit: number) {
    if (limit > 5) {
      limit = 5;
    }
    const skip = (page - 1) * limit;
    return await this.productRepository.find({
      take: limit,
      skip,
      relations: ['category'],
    });
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      return { message: 'Product not found' };
    }
    return product;
  }

  async createProduct(product: CreateProductDto) {
    const productFounded = await this.productRepository.findOne({
      where: { name: product.name },
    });

    if (productFounded) {
      return { message: 'Product already exists' };
    }

    const category = await this.categoryRepository.findOne({
      where: { name: product.category },
    });

    if (!category) {
      return { message: 'Category not found' };
    }

    if (!product.image || product.image === '') {
      product.image = `https://via.placeholder.com/${product.name.split(' ').join('')}`;
    }

    return await this.productRepository.save({ ...product, category });
  }

  async updateProduct(id: string, product: updateProductDto) {
    const productExist = await this.productRepository.findOne({
      where: { id },
    });
    if (!productExist) {
      return { message: 'Product not found' };
    }
    const category = await this.categoryRepository.findOne({
      where: { name: product.category },
    });
    if (!category) {
      return { message: 'Category not valid' };
    }

    await this.productRepository.update(id, { ...product, category });

    return await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      return { message: 'Product not found' };
    }
    await this.productRepository.delete(id);

    return { message: 'Product deleted', product };
  }

  //* Esta sección de código es para simular la base de datos
  //* Todos los métodos interactúan con products, que es un array de productos ficticio

  /*   private products: TProduct[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      stock: false,
      imgUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      stock: false,
      imgUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description 3',
      price: 300,
      stock: true,
      imgUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description 4',
      price: 400,
      stock: true,
      imgUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Description 5',
      price: 500,
      stock: true,
      imgUrl: 'https://via.placeholder.com/150',
    },
  ];

  getProductsM(page: number, limit: number) {
    //*Esto es para paginar los productos y mostrar solo los que se necesitan (depende del params)
    const start = (page - 1) * limit;
    const productsShow = this.products.slice(start, start + limit);
    return productsShow;
  }

  getProductByIdM(id: number) {
    const findProduct = this.products.find((product) => product.id === id);
    if (findProduct) {
      return findProduct;
    }
    {
      return { message: 'Product not found' };
    }
  }

  createProductM(product: TProduct) {
    const findMaxId = this.products.reduce((acc, product) => {
      return product.id > acc ? product.id : acc;
    }, 0);
    const id = findMaxId + 1;
    product.id = id;
    this.products.push(product);
    return { id, ...product };
  }

  updateProductM(id: number, product: TProduct) {
    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = { ...this.products[index], ...product };
    return this.products[index];
  }

  deleteProductM(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index) {
      this.products.splice(index, 1);
      return this.products;
    } else {
      return { message: 'Product not found' };
    }
  }
}

export type TProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string; */
}
