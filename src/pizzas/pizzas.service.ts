import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { Repository, ILike } from 'typeorm';
import { Pizza } from './pizza.entity';
import { CreatePizzaDto } from './dto/createPizza.dto';
import { UpdatePizzaDto } from './dto/updatePizza.dto';

@Injectable()
export class PizzasService {
  constructor(
    @InjectRepository(Pizza)
    private pizzaRepository: Repository<Pizza>,
    private readonly i18n: I18nService,
  ) {}

  findAll(): Promise<Pizza[]> {
    return this.pizzaRepository.find();
  }

  create(createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    if (
      !createPizzaDto.name ||
      !createPizzaDto.value ||
      !createPizzaDto.category
    ) {
      throw new BadRequestException('Nome e categoria são obrigatórios');
    }

    try {
      const pizza = this.pizzaRepository.create(createPizzaDto);
      return this.pizzaRepository.save(pizza);
    } catch {
      throw new InternalServerErrorException('Erro ao criar pizza');
    }
  }

  async update(
    id: number,
    updatePizzaDto: UpdatePizzaDto,
  ): Promise<Pizza | null> {
    const pizza = await this.pizzaRepository.findOneBy({ id });
    if (!pizza) return null;
    Object.assign(pizza, updatePizzaDto);
    return this.pizzaRepository.save(pizza);
  }

  async remove(id: number): Promise<void> {
    await this.pizzaRepository.delete(id);
    return;
  }

  async findOne(id: number): Promise<Pizza> {
    const pizza = await this.pizzaRepository.findOneBy({ id });
    if (!pizza) {
      throw new NotFoundException(
        this.i18n.t('pizza.error.notFound', { args: { id } }),
      );
    }
    return pizza;
  }

  async findByCategory(category: string): Promise<Pizza[] | null> {
    return this.pizzaRepository.find({
      where: { category },
    });
  }

  async searchByName(name: string): Promise<Pizza[] | null> {
    const term = name?.trim();

    if (!term) return [];

    return this.pizzaRepository.find({
      where: { name: ILike(`%${term}%`) },
    });
  }

  // async searchByName(name: string): Promise<Pizza[]> {
  //   try {
  //     const term = name?.trim();

  //     if (!term) return [];

  //     return await this.pizzaRepository.find({
  //       where: { name: ILike(`%${term}%`) },
  //     });
  //   } catch (error) {
  //     console.error('ERRO NA BUSCA:', error);
  //     throw error;
  //   }
  // }
}
