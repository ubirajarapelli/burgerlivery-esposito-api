// sobremesas/sobremesa.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Dessert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  capacity: string;

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
