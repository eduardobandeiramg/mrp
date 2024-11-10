import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialStockDto } from './dto/update-material-stock.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';

describe('MaterialsController', () => {
  let controller: MaterialsController;
  let service: MaterialsService;

  const mockMaterialsService = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    updateStock: jest.fn(),
    addStock: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialsController],
      providers: [
        {
          provide: MaterialsService,
          useValue: mockMaterialsService,
        },
      ],
    }).compile();

    controller = module.get<MaterialsController>(MaterialsController);
    service = module.get<MaterialsService>(MaterialsService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve chamar o método create do serviço com o DTO correto', async () => {
      const createMaterialDto: CreateMaterialDto = {
        code: 'MAT001',
        description: 'Material 1',
      };

      await controller.create(createMaterialDto);
      expect(service.create).toHaveBeenCalledWith(createMaterialDto);
    });
  });

  describe('update', () => {
    it('deve chamar o método update do serviço com o ID e DTO corretos', async () => {
      const id = uuidv4();
      const updateMaterialDto: UpdateMaterialDto = {
        code: 'MAT002',
        description: 'Material Atualizado',
      };

      await controller.update(id, updateMaterialDto);
      expect(service.update).toHaveBeenCalledWith(id, updateMaterialDto);
    });
  });

  describe('findAll', () => {
    it('deve chamar o método findAll do serviço', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('deve chamar o método findById do serviço com o ID correto', async () => {
      const id = uuidv4();
      await controller.findById(id);
      expect(service.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('delete', () => {
    it('deve chamar o método delete do serviço com o ID correto', async () => {
      const id = uuidv4();
      await controller.delete(id);
      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('update stock', () => {
    it('deve chamar o método updateStock do serviço com o DTO correto', async () => {
      const updateMaterialStockDto: UpdateMaterialStockDto = {
        id: uuidv4(),
        qtd: 5,
      };

      await controller.updateStock(updateMaterialStockDto);
      expect(service.updateStock).toHaveBeenCalledWith(updateMaterialStockDto);
    });
  });

  describe('add stock', () => {
    it('deve chamar o método addStock do serviço com o DTO correto', async () => {
      const updateMaterialStockDto: UpdateMaterialStockDto = {
        id: uuidv4(),
        qtd: 5,
      };

      await controller.addStock(updateMaterialStockDto);
      expect(service.addStock).toHaveBeenCalledWith(updateMaterialStockDto);
    });
  });
});
