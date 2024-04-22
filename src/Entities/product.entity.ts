import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidd } from 'uuid';
import { Category } from './category.entity';
import { OrderDetail } from './orderdetail.entity';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidd();

  @Column({
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    length: 255,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    nullable: false,
  })
  stock: number;

  @Column()
  image: string;

  //! Relación 1:N con la entidad Category
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  //! Relación N:N con la entidad OrderDetail (Un producto puede tener muchos detalles de pedido)
  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  @JoinTable()
  details: OrderDetail[];
}
