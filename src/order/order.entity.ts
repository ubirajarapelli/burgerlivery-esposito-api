// pedidos/pedido.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Pizza } from '../pizzas/pizza.entity';
import { Dessert } from '../dessert/dessert.entity';
import { Beverage } from '../beverage/beverage.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  status: string; // 'aberto', 'em preparação', 'entregue'

  @ManyToMany(() => Pizza)
  @JoinTable()
  pizzas: Pizza[];

  @ManyToMany(() => Beverage)
  @JoinTable()
  beverages: Beverage[];

  @ManyToMany(() => Dessert)
  @JoinTable()
  desserts: Dessert[];

  @Column({
    type: 'decimal',
    transformer: {
      to: (v: number) => v,
      from: (v: string) => Number(v),
    },
  })
  totalValue: number;

  @Column()
  deliveryAddress: string;
}
