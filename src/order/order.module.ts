import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { Dessert } from 'src/dessert/dessert.entity';
import { Beverage } from 'src/beverage/beverage.entity';
import { Pizza } from 'src/pizzas/pizza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Pizza, Beverage, Dessert])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
