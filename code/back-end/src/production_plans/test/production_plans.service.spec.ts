import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Line } from '../../line/entities/line.entity';
import { Product } from '../../products/entities/product.entity';
import { CreateProductionPlanDto } from '../dto/create-production_plan.dto';
import { ProductionPlan } from '../entities/production_plan.entity';
import { ProductionPlansService } from '../production_plans/production_plans.service';

describe('ProductionPlansService', () => {
  let service: ProductionPlansService;
  let productionPlansRepository: Repository<ProductionPlan>;
  let productsRepository: Repository<Product>;
  let linesRepository: Repository<Line>;

  const mockProductionPlansRepository = {
    save: jest.fn(),
  };
  const mockProductsRepository = {
    findOne: jest.fn(),
  };
  const mockLinesRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductionPlansService,
        {
          provide: getRepositoryToken(ProductionPlan),
          useValue: mockProductionPlansRepository,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductsRepository,
        },
        {
          provide: getRepositoryToken(Line),
          useValue: mockLinesRepository,
        },
      ],
    }).compile();

    service = module.get<ProductionPlansService>(ProductionPlansService);
    productionPlansRepository = module.get<Repository<ProductionPlan>>(
      getRepositoryToken(ProductionPlan),
    );
    productsRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    linesRepository = module.get<Repository<Line>>(getRepositoryToken(Line));
  });

  describe('create', () => {
    it('deve criar um novo plano de produção', async () => {
      const createProductionPlanDto: CreateProductionPlanDto = {
        productId: '12345',
        qtd: 10,
        datePrev: '2024-12-15',
        lineId: 'line123',
      };

      const mockProduct = {
        id: '12345',
        name: 'Product A',
      } as Partial<Product> as Product;
      const mockLine = {
        id: 'line123',
        name: 'Line A',
      } as Partial<Line> as Line;
      const mockProductionPlan = {
        id: '1',
        qtd: createProductionPlanDto.qtd,
        datePrev: new Date(createProductionPlanDto.datePrev), // mantemos o objeto Date aqui
        product: mockProduct,
        line: mockLine,
        productions: [], // Propriedade obrigatória para ProductionPlan
      } as Partial<ProductionPlan> as ProductionPlan;

      jest.spyOn(productsRepository, 'findOne').mockResolvedValue(mockProduct);
      jest.spyOn(linesRepository, 'findOne').mockResolvedValue(mockLine);
      jest
        .spyOn(productionPlansRepository, 'save')
        .mockResolvedValue(mockProductionPlan);

      const result = await service.create(createProductionPlanDto);

      expect(productsRepository.findOne).toHaveBeenCalledWith({
        where: { id: createProductionPlanDto.productId },
      });
      expect(linesRepository.findOne).toHaveBeenCalledWith({
        where: { lineId: createProductionPlanDto.lineId },
      });
      expect(productionPlansRepository.save).toHaveBeenCalledWith({
        qtd: createProductionPlanDto.qtd,
        datePrev: new Date('2024-12-15'), // garantir que este valor corresponde a dataPrev no mesmo fuso horário
        product: mockProduct,
        line: mockLine,
        productions: [],
      });
      // Comparar `datePrev` no mesmo formato de string para ignorar diferenças de fuso horário
      expect(result).toEqual({
        ...mockProductionPlan,
        datePrev: new Date(createProductionPlanDto.datePrev).toISOString(), // convertemos para string padrão ISO
      });
    });
  });
});
