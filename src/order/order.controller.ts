import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<Order[]> {
    return this.orderService.findByUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Order | null> {
    return this.orderService.findOne(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() pedido: Partial<Order>,
  ): Promise<Order | null> {
    return this.orderService.update(Number(id), pedido);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.orderService.remove(Number(id));
  }
}
