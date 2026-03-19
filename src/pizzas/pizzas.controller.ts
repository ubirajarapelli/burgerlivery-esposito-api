import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { I18nService } from 'nestjs-i18n';
import { PizzasService } from './pizzas.service';
import { Pizza } from './pizza.entity';
import { CreatePizzaDto } from './dto/createPizza.dto';
import { UpdatePizzaDto } from './dto/updatePizza.dto';
import { ApiNotFoundResponse, ApiQuery } from '@nestjs/swagger';

@Controller('pizzas')
export class PizzasController {
  constructor(
    private readonly pizzasService: PizzasService,
    private readonly i18n: I18nService,
  ) {}

  @Get()
  findAll(): Promise<Pizza[]> {
    return this.pizzasService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({
    description: 'Check custom message in service layer',
  })
  findOne(@Param('id') id: number): Promise<Pizza | null> {
    return this.pizzasService.findOne(Number(id));
  }

  @Get('search')
  @ApiQuery({ name: 'query', required: true, example: 'calabresa' })
  search(@Query('query') query: string): Promise<Pizza[] | null> {
    return this.pizzasService.searchByName(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    return this.pizzasService.create(createPizzaDto);
  }

  @Get('categoria/:categoria')
  findByCategory(
    @Param('categoria') categoria: string,
  ): Promise<Pizza[] | null> {
    return this.pizzasService.findByCategory(categoria);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatePizzaDto: UpdatePizzaDto,
  ): Promise<Pizza | null> {
    return this.pizzasService.update(Number(id), updatePizzaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.pizzasService.remove(Number(id));
  }
}
