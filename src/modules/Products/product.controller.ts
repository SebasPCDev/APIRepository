import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { ProductDbService } from './productdb.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../Auth/enum/roles.enum';
import { RolesGuard } from '../../guards/roles.guard';
import { updateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productDbService: ProductDbService) {}

  //* Implementación del CRUD con la base de datos

  //! GETS

  @Get()
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.productDbService.getProducts(page, limit);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  @Get('/seeder')
  loadProducts() {
    return this.productDbService.resetProducts();
  }

  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productDbService.getProductById(id);
  }

  //! POST
  @ApiBearerAuth()
  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  createProduct(@Body() product: CreateProductDto) {
    return this.productDbService.createProduct(product);
  }

  //! PUT
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: updateProductDto,
  ) {
    return this.productDbService.updateProduct(id, product);
  }

  //! DELETE
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productDbService.deleteProduct(id);
  }

  //-----------------------------------------------------------------------------------------

  /*   @Get()
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.productsService.getProducts(page, limit);
  }

  @Get(':id')
  getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(+id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() product: Product) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: number, @Body() product: Product) {
    return this.productsService.updateProduct(+id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProduct(+id);
  } */
}
