import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../Entities/user.entity';
import { Order } from '../../Entities/order.entity';
import { OrderDetail } from '../../Entities/orderdetail.entity';
import { Product } from '../../Entities/product.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  imports: [TypeOrmModule.forFeature([User, Order, OrderDetail, Product])],
})
export class OrdersModule {}
