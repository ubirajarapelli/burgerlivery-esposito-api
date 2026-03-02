import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BeverageService } from './beverage.service';
import { Beverage } from './beverage.entity';
import { CreateBeverageDto } from './dto/createBeverage.dto';

@Controller('beverage')
export class BeverageController {
  constructor(private readonly beverageService: BeverageService) {}

  @Get()
  findAll(): Promise<Beverage[]> {
    return this.beverageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Beverage | null> {
    return this.beverageService.findOne(id);
  }

  @Post()
  create(@Body() beverage: CreateBeverageDto): Promise<Beverage> {
    return this.beverageService.create(beverage);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() beverage: CreateBeverageDto,
  ): Promise<Beverage | null> {
    return this.beverageService.update(id, beverage);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.beverageService.remove(id);
  }
}
