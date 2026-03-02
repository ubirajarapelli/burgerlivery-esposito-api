import { Test, TestingModule } from '@nestjs/testing';
import { DessertController } from './dessert.controller';

describe('DessertController', () => {
  let controller: DessertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DessertController],
    }).compile();

    controller = module.get<DessertController>(DessertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
