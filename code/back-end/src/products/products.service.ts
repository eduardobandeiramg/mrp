import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Line } from '../line/entities/line.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(Line)
    private linesRepository: Repository<Line>,
  ) {}

  async create(createProductDto: CreateProductDTO): Promise<void> {
    const { description, code, lineId } = createProductDto;

    await this.validateProduct(description);

    const line = await this.linesRepository.findOne({
      where: { lineId }, // Ajuste para usar `lineId` diretamente
    });

    if (!line) {
      throw new ConflictException('Linha não encontrada.');
    }

    const product = this.productsRepository.create({
      description,
      code,
      line,
    });

    try {
      await this.productsRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar produto.');
    }
}

  async validateProduct(description: string): Promise<void> {
    const existingProduct = await this.findOneProduct(description);
    if (existingProduct) {
      throw new ConflictException('Descrição já está em uso.');
    }
  }

  async findOneProduct(description: string): Promise<Product | null> {
    return await this.productsRepository.findOne({
        where: { description, isActive: true },
    });
}

  async findOneByID(id: string): Promise<Product | undefined> {
    return this.productsRepository.findOne({ where: { id, isActive: true } });
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productsRepository.find({ where: { isActive: true } });
    } catch (error) {
      throw new Error('Erro ao buscar linhas de produção: ' + error.message);
    }
  }

  async deactivateProduct(id: string): Promise<void> {
    const product = await this.findOneByID(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.isActive = false;
    await this.productsRepository.save(product);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDTO): Promise<Product> {
    const product = await this.findOneByID(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const { description, code, lineId } = updateProductDto;

    if (description !== undefined) {
      product.description = description;
    }

    if (code !== undefined) {
      product.code = code;
    }

    if (lineId !== undefined) {
      const line = await this.linesRepository.findOne({ where: { lineId } });
      if (!line) {
        throw new NotFoundException('Line not found');
      }
      product.line = line;
    }

    await this.productsRepository.save(product);
    return product;
  }


}