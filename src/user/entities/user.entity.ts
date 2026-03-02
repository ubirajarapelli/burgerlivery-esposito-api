// usuarios/usuario.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ nullable: true })
  role: string;

  // @Column({ type: 'json', nullable: true })
  @OneToOne(() => Address, { cascade: true, eager: true, nullable: true })
  @JoinColumn()
  address: Address;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  googleId: string; // Para autenticação via Google OAuth
}
