import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';
import { MaterialsService } from './materials.service';

describe('MaterialsService', () => {
  let service: MaterialsService;
  let materialsRepository: Repository<Material>;

  const mockMaterialRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    updateStock: jest.fn(),
    addStock: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaterialsService,
        {
          provide: getRepositoryToken(Material),
          useValue: mockMaterialRepository,
        },
      ],
    }).compile();

    service = module.get<MaterialsService>(MaterialsService);
    materialsRepository = module.get<Repository<Material>>(
      getRepositoryToken(Material),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um novo material', async () => {
      const createMaterialDto: CreateMaterialDto = {
        code: 'MAT001',
        description: 'Material 1',
      };

      mockMaterialRepository.findOne.mockResolvedValue(null);
      mockMaterialRepository.create.mockReturnValue(createMaterialDto);
      mockMaterialRepository.save.mockResolvedValue(undefined);

      await service.create(createMaterialDto);

      expect(mockMaterialRepository.create).toHaveBeenCalledWith({
        code: 'MAT001'.toUpperCase(),
        description: 'Material 1',
      });
      expect(mockMaterialRepository.save).toHaveBeenCalled();
    });

    it('deve lançar ConflictException se o código já existir', async () => {
      const createMaterialDto: CreateMaterialDto = {
        code: 'MAT001',
        description: 'Material 1',
      };

      mockMaterialRepository.findOne.mockResolvedValue(createMaterialDto);

      await expect(service.create(createMaterialDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('deve lançar InternalServerErrorException se o save falhar', async () => {
      const createMaterialDto: CreateMaterialDto = {
        code: 'MAT001',
        description: 'Material 1',
      };

      mockMaterialRepository.findOne.mockResolvedValue(null);
      mockMaterialRepository.create.mockReturnValue(createMaterialDto);
      mockMaterialRepository.save.mockRejectedValue(new Error('Save failed'));

      await expect(service.create(createMaterialDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar o material', async () => {
      const id = uuidv4();
      const updateMaterialDto: UpdateMaterialDto = {
        code: 'MAT002',
        description: 'Material Atualizado',
      };

      mockMaterialRepository.findOne.mockResolvedValueOnce({
        id,
        ...updateMaterialDto,
      });
      mockMaterialRepository.findOne.mockResolvedValueOnce(null);
      mockMaterialRepository.update.mockResolvedValue(undefined);

      await service.update(id, updateMaterialDto);

      expect(mockMaterialRepository.update).toHaveBeenCalledWith(id, {
        code: 'MAT002'.toUpperCase(),
        description: 'Material Atualizado',
      });
    });

    it('deve lançar ConflictException se o código já existir para outro material', async () => {
      const id = uuidv4();
      const updateMaterialDto: UpdateMaterialDto = {
        code: 'MAT002',
        description: 'Material Atualizado',
      };

      mockMaterialRepository.findOne.mockResolvedValueOnce({
        id,
        ...updateMaterialDto,
      });
      mockMaterialRepository.findOne.mockResolvedValueOnce({
        id: uuidv4(),
        code: 'MAT002',
      });

      await expect(service.update(id, updateMaterialDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('deve lançar InternalServerErrorException se a atualização falhar', async () => {
      const id = uuidv4();
      const updateMaterialDto: UpdateMaterialDto = {
        code: 'MAT002',
        description: 'Material Atualizado',
      };

      mockMaterialRepository.findOne.mockResolvedValueOnce({
        id,
        ...updateMaterialDto,
      });
      mockMaterialRepository.findOne.mockResolvedValueOnce(null);

      mockMaterialRepository.update.mockRejectedValue(
        new Error('Update failed'),
      );

      await expect(service.update(id, updateMaterialDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar um array de materiais', async () => {
      const materials = [
        { id: uuidv4(), code: 'MAT001', description: 'Material 1' },
        { id: uuidv4(), code: 'MAT002', description: 'Material 2' },
      ];

      mockMaterialRepository.find.mockResolvedValue(materials);

      const result = await service.findAll();
      expect(result).toEqual(materials);
      expect(mockMaterialRepository.find).toHaveBeenCalled();
    });

    it('deve lançar InternalServerErrorException se findAll falhar', async () => {
      mockMaterialRepository.find.mockRejectedValue(new Error('Find failed'));
      await expect(service.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findById', () => {
    it('deve retornar um material pelo ID', async () => {
      const id = uuidv4();
      const material = { id, code: 'MAT001', description: 'Material 1' };

      mockMaterialRepository.findOne.mockResolvedValue(material);

      const result = await service.findById(id);
      expect(result).toEqual(material);
      expect(mockMaterialRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('deve lançar ConflictException se o material não for encontrado', async () => {
      const id = uuidv4();
      mockMaterialRepository.findOne.mockResolvedValue(null);

      await expect(service.findById(id)).rejects.toThrow(ConflictException);
    });
  });

  describe('delete', () => {
    it('deve excluir um material', async () => {
      const id = uuidv4();
      const material = { id, code: 'MAT001', description: 'Material 1' };

      mockMaterialRepository.findOne.mockResolvedValue(material);
      mockMaterialRepository.delete.mockResolvedValue(undefined);

      await service.delete(id);
      expect(mockMaterialRepository.delete).toHaveBeenCalledWith(material);
    });

    it('deve lançar ConflictException se o material não for encontrado antes de excluir', async () => {
      const id = uuidv4();
      mockMaterialRepository.findOne.mockResolvedValue(null);

      await expect(service.delete(id)).rejects.toThrow(ConflictException);
    });

    it('deve lançar InternalServerErrorException se a exclusão falhar', async () => {
      const id = uuidv4();
      const material = { id, code: 'MAT001', description: 'Material 1' };

      mockMaterialRepository.findOne.mockResolvedValue(material);
      mockMaterialRepository.delete.mockRejectedValue(
        new Error('Delete failed'),
      );

      await expect(service.delete(id)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('updateStock', () => {
    it('deve atualizar o estoque do material com sucesso', async () => {
      const id = uuidv4();
      const updateMaterialStockDto = { id, qtd: 20 };
      const mockMaterial = {
        id,
        code: 'MAT001',
        description: 'Descrição do material',
        qtd: 10,
      };

      jest
        .spyOn(service, 'validateExistingMaterial')
        .mockResolvedValue(mockMaterial);
      mockMaterialRepository.save.mockResolvedValue(mockMaterial);

      await service.updateStock(updateMaterialStockDto);

      expect(service.validateExistingMaterial).toHaveBeenCalledWith(id);
      expect(mockMaterialRepository.save).toHaveBeenCalledWith({
        ...mockMaterial,
        qtd: 20,
      });
    });

    it('deve lançar InternalServerErrorException quando save falhar', async () => {
      const id = uuidv4();
      const updateMaterialStockDto = { id, qtd: 20 };
      const mockMaterial = {
        id,
        code: 'MAT001',
        description: 'Descrição do material',
        qtd: 10,
      };

      jest
        .spyOn(service, 'validateExistingMaterial')
        .mockResolvedValue(mockMaterial);

      mockMaterialRepository.save.mockRejectedValueOnce(new Error());
      await expect(service.updateStock(updateMaterialStockDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('addStock', () => {
    it('deve adicionar estoque ao material com sucesso', async () => {
      const id = uuidv4();
      const updateMaterialStockDto = { id, qtd: 5 };
      const mockMaterial = {
        id,
        code: 'MAT001',
        description: 'Descrição do material',
        qtd: 10,
      };

      jest
        .spyOn(service, 'validateExistingMaterial')
        .mockResolvedValue({ ...mockMaterial });
      mockMaterialRepository.save.mockResolvedValue({
        ...mockMaterial,
        qtd: 15,
      });

      await service.addStock(updateMaterialStockDto);

      expect(service.validateExistingMaterial).toHaveBeenCalledWith(id);
      expect(mockMaterialRepository.save).toHaveBeenCalledWith({
        ...mockMaterial,
        qtd: mockMaterial.qtd + updateMaterialStockDto.qtd,
      });
    });

    it('deve lançar InternalServerErrorException quando save falhar durante addStock', async () => {
      const id = uuidv4();
      const updateMaterialStockDto = { id, qtd: 5 };
      const mockMaterial = {
        id,
        code: 'MAT001',
        description: 'Descrição do material',
        qtd: 10,
      };

      jest
        .spyOn(service, 'validateExistingMaterial')
        .mockResolvedValue(mockMaterial);

      mockMaterialRepository.save.mockRejectedValueOnce(new Error());
      await expect(service.addStock(updateMaterialStockDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('validateExistingMaterial', () => {
    it('deve retornar o material existente', async () => {
      const id = uuidv4();
      const material = { id, code: 'MAT001', description: 'Material 1' };

      mockMaterialRepository.findOne.mockResolvedValue(material);

      const result = await service.validateExistingMaterial(id);
      expect(result).toEqual(material);
      expect(mockMaterialRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('deve lançar ConflictException se o material não for encontrado', async () => {
      const id = uuidv4();
      mockMaterialRepository.findOne.mockResolvedValue(null);

      await expect(service.validateExistingMaterial(id)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
