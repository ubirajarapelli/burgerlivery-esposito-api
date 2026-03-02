import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dessert } from './dessert.entity';
import { CreateDessertDto } from './dto/createDessert.dto';
import { UpdateDessertDto } from './dto/updateDessert.dto';

@Injectable()
export class DessertsService {
  constructor(
    @InjectRepository(Dessert)
    private dessertsRepository: Repository<Dessert>,
  ) {}

  findAll(): Promise<Dessert[]> {
    return this.dessertsRepository.find();
  }

  findOne(id: number): Promise<Dessert | null> {
    return this.dessertsRepository.findOneBy({ id });
  }

  create(dessert: CreateDessertDto): Promise<Dessert> {
    return this.dessertsRepository.save(dessert);
  }

  async update(id: number, dessert: UpdateDessertDto): Promise<Dessert | null> {
    await this.dessertsRepository.update(id, dessert);
    return this.dessertsRepository.findOneBy({ id });
  }

  remove(id: number): Promise<void> {
    return this.dessertsRepository.delete(id).then(() => undefined);
  }
}
