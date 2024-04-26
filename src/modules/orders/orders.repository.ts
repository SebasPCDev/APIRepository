import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../Entities/user.entity';
import { Order } from '../../Entities/order.entity';
import { Product } from '../../Entities/product.entity';
import { OrderDetail } from '../../Entities/orderdetail.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async generateOrder() {}

  async addOrder(createOrderDto: CreateOrderDto, userRequest: any) {
    const userFinded = await this.userRepository.findOne({
      where: { id: createOrderDto.id },
    });

    //Verificamos que el usuario exista
    if (!userFinded) throw new NotFoundException('User not found');

    //Verificamos que un usuario no pueda crear una orden para otro usuario.
    if (
      userRequest.role.includes('user') &&
      userRequest.id !== createOrderDto.id
    ) {
      throw new BadRequestException('You can only create orders for yourself');
    }
    //Vericicamos que un admin no pueda crear una orden para un superadmin
    if (
      userRequest.role.includes('admin') &&
      userFinded.role === 'superadmin'
    ) {
      throw new BadRequestException(
        'Admins cannot create orders for superadmins',
      );
    }

    const { products } = createOrderDto;

    const hasID = products.every(
      (element) => element.id !== undefined && element.id.length === 36,
    );
    if (!hasID) throw new BadRequestException('Product ID invalid');

    console.log(products.map((element) => element.id));

    const order = new Order();
    order.date = new Date();
    order.user = userFinded;

    let total = 0;
    const producsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productRepository.findOneBy({
          id: element.id,
        });

        if (!product) {
          throw new NotFoundException('Product not found');
        }

        if (product.stock === 0) {
          return null;
        }

        total += Number(product.price);

        await this.productRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    const newOrder = await this.orderRepository.save(order);

    const orderDetail = new OrderDetail();
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = producsArray;
    orderDetail.id_order = newOrder;

    await this.orderDetailRepository.save(orderDetail);

    const orderFinded = await this.orderRepository.findOne({
      where: { id: newOrder.id },
    });

    const receipt = {
      order: orderFinded,
      price: orderDetail.price,
      id_detail: orderDetail.id,
    };

    return receipt;
  }

  async getOrders(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!order) throw new NotFoundException('Order not found');

    const orderModified = { ...order, user: order.user.id };

    const orderDetail = await this.orderDetailRepository.findOne({
      where: { id_order: order },
    });

    const products = await this.productRepository.find({
      where: { details: orderDetail },
    });

    const productsReceipt = await Promise.all(
      products.map(async (element) => {
        const product = {
          id: element.id,
          name: element.name,
          price: element.price,
        };

        return product;
      }),
    );

    const orderComplete = { order: orderModified, products: productsReceipt };

    return orderComplete;
  }
}
