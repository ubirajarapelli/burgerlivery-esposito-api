import { PartialType } from '@nestjs/swagger';
import { CreatePizzaDto } from './createPizza.dto';

export class UpdatePizzaDto extends PartialType(CreatePizzaDto) {}
