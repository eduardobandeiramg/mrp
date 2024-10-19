import { Test, TestingModule } from '@nestjs/testing';
import { ProductionPlansController } from './production_plans.controller';
import { ProductionPlansService } from './production_plans.service';

describe('ProductionPlansController', () => {
  let controller: ProductionPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionPlansController],
      providers: [ProductionPlansService],
    }).compile();

    controller = module.get<ProductionPlansController>(ProductionPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
