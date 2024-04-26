import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../Auth/enum/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User, Role.Superadmin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  addOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    return this.ordersService.addOrder(createOrderDto, req.user);
  }

  @ApiBearerAuth()
  @Get(':id')
  getOrders(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrders(id);
  }

  //----------------------------------------------------------
}
