import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidd } from 'uuid';
import { User } from './user.entity';
import { OrderDetail } from './orderdetail.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidd();

  @Column()
  date: Date;

  //! Relación N:1 con la entidad User (Un pedido solo puede tener un usuario)
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  //! Relación 1:1 con la entidad OrderDetail (Un pedido puede tener un solo detalle de pedido)
  @OneToOne(() => OrderDetail) id_detail: OrderDetail;
}
