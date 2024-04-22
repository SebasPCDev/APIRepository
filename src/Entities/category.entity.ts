import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidd } from 'uuid';
import { Product } from './product.entity';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidd();

  @Column({
    length: 50,
    unique: true,
    nullable: false,
    type: 'varchar',
  })
  name: string;

  @OneToMany(() => Product, (product) => product.category) products: Product[];
}
