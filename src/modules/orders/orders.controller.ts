import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  addOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.addOrder(createOrderDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  getOrders(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrders(id);
  }

  //----------------------------------------------------------
}
