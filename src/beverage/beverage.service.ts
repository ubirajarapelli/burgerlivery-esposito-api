import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beverage } from './beverage.entity';
import { CreateBeverageDto } from './dto/createBeverage.dto';

@Injectable()
export class BeverageService {
  constructor(
    @InjectRepository(Beverage)
    private beveragesRepository: Repository<Beverage>,
  ) {}

  findAll(): Promise<Beverage[]> {
    return this.beveragesRepository.find();
  }

  findOne(id: number): Promise<Beverage | null> {
    return this.beveragesRepository.findOneBy({ id });
  }

  create(beverage: CreateBeverageDto): Promise<Beverage> {
    const newBeverage = this.beveragesRepository.create(beverage);
    return this.beveragesRepository.save(newBeverage);
  }

  async update(
    id: number,
    beverage: CreateBeverageDto,
  ): Promise<Beverage | null> {
    await this.beveragesRepository.update(id, beverage);
    return this.beveragesRepository.findOneBy({ id });
  }

  remove(id: number): Promise<void> {
    return this.beveragesRepository.delete(id).then(() => undefined);
  }
}
