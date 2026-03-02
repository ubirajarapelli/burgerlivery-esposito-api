import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { DessertsService } from './dessert.service';
import { Dessert } from './dessert.entity';
import { CreateDessertDto } from './dto/createDessert.dto';
import { UpdateDessertDto } from './dto/updateDessert.dto';

@Controller('dessert')
export class DessertController {
  constructor(private readonly dessertsService: DessertsService) {}

  @Get()
  findAll(): Promise<Dessert[]> {
    return this.dessertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Dessert | null> {
    return this.dessertsService.findOne(id);
  }

  @Post()
  create(@Body() dessert: CreateDessertDto): Promise<Dessert> {
    return this.dessertsService.create(dessert);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dessert: UpdateDessertDto,
  ): Promise<Dessert | null> {
    return this.dessertsService.update(id, dessert);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.dessertsService.remove(id);
  }
}
