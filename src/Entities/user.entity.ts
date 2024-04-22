import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidd } from 'uuid';
import { Order } from './order.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidd();

  @Column({
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column()
  phone: number;

  @Column()
  address: string;

  @Column()
  country: string;

  @Column({
    length: 50,
  })
  city: string;

  @Column({ default: false })
  admin: boolean;

  //! Relación 1:N con la entidad Order (Un usuario puede tener muchos pedidos)
  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn({ name: 'orders_id' })
  orders: Order[];
}
