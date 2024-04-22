import { IsOptional, IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class updateProductDto {
  /**
   * El nombre debe tener entre 5 y 50 caracteres.
   * @example 'Laptop'
   */
  @IsString()
  @Length(5, 50)
  @IsOptional()
  name: string;

  /**
   * La descripción debe tener entre 10 y 100 caracteres.
   * @example 'Laptop de 15 pulgadas'
   */
  @IsString()
  @Length(10, 100)
  @IsOptional()
  description: string;

  /**
   * El precio debe ser un número.
   * @example 1000
   */
  @IsNumber()
  @IsOptional()
  price: number;

  /**
   * El stock debe ser un número.
   * @example 100
   */
  @IsNumber()
  @IsOptional()
  stock: number;

  /**
   * La imagen debe ser una URL válida.
   * @example 'https://example.com/image.jpg'
   */
  @IsString()
  @IsUrl()
  @IsOptional()
  image: string;

  /**
   * La categoría debe ser un string y pertenecer a una lista de categorías permitidas.
   * @example 'Electronics'
   */
  @IsString()
  @IsOptional()
  category: string;
}
