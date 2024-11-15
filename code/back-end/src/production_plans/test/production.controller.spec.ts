import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductionDto } from '../dto/create-production.dto';
import { ProductionStatus } from '../enums/status.enum';
import { ProductionController } from '../production/production.controller';
import { ProductionService } from '../production/production.service';

describe('ProductionController', () => {
  let controller: ProductionController;
  let service: ProductionService;

  const mockProductionService = {
    create: jest.fn(),
    startProduction: jest.fn(),
    endProduction: jest.fn(), // Adicionado endProduction no mock
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionController],
      providers: [
        {
          provide: ProductionService,
          useValue: mockProductionService,
        },
      ],
    }).compile();

    controller = module.get<ProductionController>(ProductionController);
    service = module.get<ProductionService>(ProductionService);
  });

  describe('create', () => {
    it('deve chamar o método create do service com o DTO correto', async () => {
      const createProductionDto: CreateProductionDto = {
        productId: 'product123',
        productionPlanId: 'productionPlan123',
        dateInit: new Date().toISOString(),
        dateEnd: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000,
        ).toISOString(),
      };

      const mockResult = {
        id: '1',
        productId: createProductionDto.productId,
        productionPlanId: createProductionDto.productionPlanId,
        dateInit: new Date(createProductionDto.dateInit),
        dateEnd: new Date(createProductionDto.dateEnd),
        status: ProductionStatus.A_PRODUZIR,
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockResult);

      const result = await controller.create(createProductionDto);

      expect(service.create).toHaveBeenCalledWith(createProductionDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('startProduction', () => {
    it('deve chamar o método startProduction do service com o ID correto e retornar o resultado', async () => {
      const productionId = '1';
      const mockResult = {
        id: productionId,
        dateInit: new Date(),
        status: ProductionStatus.EM_PRODUCAO,
      };

      jest.spyOn(service, 'startProduction').mockResolvedValue(mockResult);

      const result = await controller.startProduction(productionId);

      expect(service.startProduction).toHaveBeenCalledWith(productionId);
      expect(result).toEqual(mockResult);
    });
  });

  describe('endProduction', () => {
    it('deve chamar o método endProduction do service com o ID correto e retornar o resultado', async () => {
      const productionId = '1';
      const mockResult = {
        id: productionId,
        dateEnd: new Date(),
        status: ProductionStatus.FINALIZADO,
      };

      jest.spyOn(service, 'endProduction').mockResolvedValue(mockResult);

      const result = await controller.endProduction(productionId);

      expect(service.endProduction).toHaveBeenCalledWith(productionId);
      expect(result).toEqual(mockResult);
    });
  });
});
