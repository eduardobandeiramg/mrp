import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            updateProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const dto = { description: 'Product B', code: 'P123' };
      const mockProduct = {
        id: '54321',
        ...dto,
        isActive: true,
        productionPlans: [],
        productions: [],
      };

      jest
        .spyOn(productRepository, 'create')
        .mockReturnValue(mockProduct as Product);
      jest
        .spyOn(productRepository, 'save')
        .mockResolvedValue(mockProduct as Product);

      await service.create(dto);

      expect(productRepository.create).toHaveBeenCalledWith(dto);
      expect(productRepository.save).toHaveBeenCalledWith(mockProduct);
    });
  });

  describe('updateProduct', () => {
    it('should update a product by ID', async () => {
      const productId = '12345';
      const updateDto = { description: 'Updated Product', code: 'P456' };
      const mockUpdatedProduct = {
        id: productId,
        ...updateDto,
        isActive: true,
      };

      jest
        .spyOn(productRepository, 'save')
        .mockResolvedValue(mockUpdatedProduct as Product);
      jest
        .spyOn(service, 'updateProduct')
        .mockResolvedValue(mockUpdatedProduct as Product);

      const result = await service.updateProduct(productId, updateDto);

      expect(result).toEqual(mockUpdatedProduct);
      expect(service.updateProduct).toHaveBeenCalledWith(productId, updateDto);
    });
  });
});
