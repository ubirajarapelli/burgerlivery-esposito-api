// bebidas/bebida.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Beverage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string; // Ex: 'vinho', 'refrigerante', 'suco'

  @Column({ nullable: true })
  capacity: string; // Ex: 350, 600, 750 (para bebidas diferentes)

  @Column()
  image: string;

  @Column('decimal')
  value: number;
}
