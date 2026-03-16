// pizzas/pizza.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pizza {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('simple-array')
  size: string[]; // ['large', 'small']

  @Column()
  category: string; // 'Tradicional', 'Doce'

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({
    type: 'decimal',
    transformer: {
      to: (v: number) => v,
      from: (v: string) => Number(v),
    },
  })
  value: number;
}
