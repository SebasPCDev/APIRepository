import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/Entities/product.entity';

export class CreateOrderDto {
  /**
   * El id debe ser un UUID. Debe ser el ID de la persona que genera el pedido.
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  @IsNotEmpty()
  @IsUUID()
  id: string;

  /**
   * En este caso, el array de productos debe contener al menos un producto.
   * @example []
   */

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  products: Pick<Product, 'id'>[];
}
