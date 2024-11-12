import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Line } from '../../line/entities/line.entity';
import { ProductionPlansService } from '../../production_plans/production_plans/production_plans.service';
import { Product } from '../../products/entities/product.entity';
import { ProductionPlan } from '../entities/production_plan.entity';

describe('ProductionPlansService', () => {
  let service: ProductionPlansService;
  let productionPlansRepository: Repository<ProductionPlan>;
  let productsRepository: Repository<Product>;
  let linesRepository: Repository<Line>;

  const mockProductionPlansRepository = {
    createQueryBuilder: jest.fn(),
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

  describe('findByDates', () => {
    it('deve retornar planos de produção dentro do intervalo de datas', async () => {
      const startDate = '2024-01-01';
      const endDate = '2024-12-31';

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([
          {
            id: '1',
            qtd: 10,
            datePrev: new Date('2024-06-15'),
            product: { id: 'product123', description: 'Product A' },
            line: { lineId: 'line123', name: 'Line A' },
            productions: [],
          } as ProductionPlan,
        ]),
      };

      jest
        .spyOn(productionPlansRepository, 'createQueryBuilder')
        .mockImplementation(() => mockQueryBuilder as any);

      const result = await service.findByDates(startDate, endDate);

      expect(productionPlansRepository.createQueryBuilder).toHaveBeenCalledWith(
        'productionPlan',
      );
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'productionPlan.product',
        'product',
      );
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'productionPlan.line',
        'line',
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'productionPlan.datePrev >= :startDate',
        { startDate },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'productionPlan.datePrev <= :endDate',
        { endDate },
      );
      expect(result).toEqual([
        {
          id: '1',
          qtd: 10,
          datePrev: new Date('2024-06-15'),
          product: { id: 'product123', description: 'Product A' },
          line: { lineId: 'line123', name: 'Line A' },
          productions: [],
        },
      ]);
    });
  });

  // describe('findOneById', () => {
  //   it('deve retornar um plano de produção pelo ID', async () => {
  //     const productionPlanId = '1';
  //     const mockProductionPlan: ProductionPlan = {
  //       id: productionPlanId,
  //       qtd: 10,
  //       datePrev: new Date('2024-06-15'),
  //       product: { id: 'product123', description: 'Product A' } as Product,
  //       line: { lineId: 'line123', name: 'Line A' } as Line,
  //       productions: [],
  //     };

  //     jest
  //       .spyOn(productionPlansRepository, 'findOne')
  //       .mockResolvedValue(mockProductionPlan);

  //     const result = await service.findOneById(productionPlanId);

  //     expect(productionPlansRepository.findOne).toHaveBeenCalledWith({
  //       where: { id: productionPlanId },
  //       relations: ['product'],
  //     });
  //     expect(result).toEqual(mockProductionPlan);
  //   });

  //   it('deve lançar um NotFoundException se o plano de produção não for encontrado', async () => {
  //     const productionPlanId = '2';
  //     jest.spyOn(productionPlansRepository, 'findOne').mockResolvedValue(null);

  //     await expect(service.findOneById(productionPlanId)).rejects.toThrow(
  //       'Production Plan with ID 2 not found',
  //     );
  //   });
  // });
});
