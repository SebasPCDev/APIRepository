import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidd } from 'uuid';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity({
  name: 'orderdetails',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidd();

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  //! Relación 1:1 con la entidad Order (Un detalle de pedido puede tener un solo pedido)
  @OneToOne(() => Order)
  @JoinColumn({ name: 'id_order' })
  id_order: Order;

  //! Relación N:N con la entidad Product (Un detalle de pedido puede tener muchos productos)
  @ManyToMany(() => Product, (product) => product.details)
  products: Product[];
}
