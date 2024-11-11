import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductionPlanDto } from '../dto/create-production_plan.dto';
import { ProductionPlansController } from '../production_plans/production_plans.controller';
import { ProductionPlansService } from '../production_plans/production_plans.service';

describe('ProductionPlansController', () => {
  let controller: ProductionPlansController;
  let service: ProductionPlansService;

  const mockProductionPlansService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionPlansController],
      providers: [
        {
          provide: ProductionPlansService,
          useValue: mockProductionPlansService,
        },
      ],
    }).compile();

    controller = module.get<ProductionPlansController>(
      ProductionPlansController,
    );
    service = module.get<ProductionPlansService>(ProductionPlansService);
  });

  describe('create', () => {
    it('deve chamar o método create do serviço com o DTO correto', async () => {
      const createProductionPlanDto: CreateProductionPlanDto = {
        productId: '12345',
        qtd: 10,
        datePrev: new Date().toISOString(),
      };

      await controller.create(createProductionPlanDto);
      expect(service.create).toHaveBeenCalledWith(createProductionPlanDto);
    });
  });
});
