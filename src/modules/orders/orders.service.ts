import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
//import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  addOrder(createOrderDto: CreateOrderDto, userRequest: any) {
    return this.ordersRepository.addOrder(createOrderDto, userRequest);
  }

  getOrders(id: string) {
    return this.ordersRepository.getOrders(id);
  }
}
