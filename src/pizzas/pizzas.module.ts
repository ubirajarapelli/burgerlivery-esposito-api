import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzasController } from './pizzas.controller';
import { PizzasService } from './pizzas.service';
import { Pizza } from './pizza.entity'; // Adjust the path if needed

@Module({
  imports: [TypeOrmModule.forFeature([Pizza])],
  controllers: [PizzasController],
  providers: [PizzasService],
})
export class PizzasModule {}
