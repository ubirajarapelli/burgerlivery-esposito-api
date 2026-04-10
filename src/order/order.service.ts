import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Pizza } from '../pizzas/pizza.entity';
import { Beverage } from '../beverage/beverage.entity';
import { Dessert } from '../dessert/dessert.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(Pizza)
    private pizzaRepository: Repository<Pizza>,

    @InjectRepository(Beverage)
    private beverageRepository: Repository<Beverage>,

    @InjectRepository(Dessert)
    private dessertRepository: Repository<Dessert>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findOne(id: number): Promise<Order | null> {
    return this.orderRepository.findOneBy({ id });
  }

  async findByUser(userId: string) {
    const orders = await this.orderRepository.find({
      where: { userId },
      relations: ['pizzas', 'beverages', 'desserts'],
    });

    return orders.map((order) => {
      const allItems = [...order.pizzas, ...order.beverages, ...order.desserts];
      const mostExpensive = allItems.reduce(
        (max, item) => (item.value > max.value ? item : max),
        allItems[0],
      );

      return {
        ...order,
        createdAt: order.createdAt,
        mostExpensiveItemImage: mostExpensive?.image ?? null,
      };
    });
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Busca os itens conforme os arrays de ID
    const pizzas =
      createOrderDto.pizzaIds && createOrderDto.pizzaIds.length
        ? await this.pizzaRepository.find({
            where: { id: In(createOrderDto.pizzaIds) },
          })
        : [];

    const beverages =
      createOrderDto.beverageIds && createOrderDto.beverageIds.length
        ? await this.beverageRepository.find({
            where: { id: In(createOrderDto.beverageIds) },
          })
        : [];

    const desserts =
      createOrderDto.dessertIds && createOrderDto.dessertIds.length
        ? await this.dessertRepository.find({
            where: { id: In(createOrderDto.dessertIds) },
          })
        : [];

    const totalValue =
      pizzas.reduce((acc, p) => acc + (p.value ?? 0), 0) +
      beverages.reduce((acc, b) => acc + (b.value ?? 0), 0) +
      desserts.reduce((acc, d) => acc + (d.value ?? 0), 0);

    const order = this.orderRepository.create({
      userId: createOrderDto.userId,
      pizzas,
      beverages,
      desserts,
      totalValue,
      deliveryAddress: createOrderDto.deliveryAddress,
      status: 'aberto', // valor default, pode ajustar conforme contexto
    });

    return this.orderRepository.save(order);
  }

  async update(id: number, order: Partial<Order>): Promise<Order | null> {
    await this.orderRepository.update(id, order);
    return this.orderRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
    return;
  }
}
