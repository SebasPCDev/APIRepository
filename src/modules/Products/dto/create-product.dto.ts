import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateProductDto {
  /**
   * El nombre debe tener entre 5 y 50 caracteres.
   * @example 'Laptop'
   */
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  /**
   * La descripción debe tener entre 10 y 100 caracteres.
   * @example 'Laptop de 15 pulgadas'
   */
  @IsString()
  @IsNotEmpty()
  @Length(10, 100)
  description: string;

  /**
   * El precio debe ser un número.
   * @example 1000
   */
  @IsNumber()
  @IsNotEmpty()
  price: number;

  /**
   * El stock debe ser un número.
   * @example 100
   */
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  /**
   * La imagen debe ser una URL válida.
   * @example 'https://example.com/image.jpg'
   */
  @IsOptional()
  @IsString()
  @IsUrl()
  image: string;

  /**
   * La categoría debe ser un string y pertenecer a una lista de categorías permitidas.
   * @example 'Electronics'
   */
  @IsString()
  @IsNotEmpty()
  category: string;
}
