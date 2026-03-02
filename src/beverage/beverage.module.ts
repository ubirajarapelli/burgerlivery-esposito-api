import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeverageController } from './beverage.controller';
import { BeverageService } from './beverage.service';
import { Beverage } from './beverage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beverage])],
  controllers: [BeverageController],
  providers: [BeverageService],
})
export class BeverageModule {}
