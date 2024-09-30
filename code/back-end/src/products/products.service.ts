import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Line } from '../line/entities/line.entity';
import { CreateProductDTO } from './dto/create-product.dto';
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

    // Verificar se já existe um produto com a mesma descrição
    await this.validateProduct(description);

    // Buscar a linha associada ao produto
    const line = await this.linesRepository.findOne({
      where: { lineId: lineId.lineId },
    });
    if (!line) {
      throw new ConflictException('Linha não encontrada.');
    }

    // Criar e salvar o produto no banco de dados
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

  async findOneProduct(description: string): Promise<Product | undefined> {
    return this.productsRepository.findOne({
      where: { description },
    });
  }

  async findOneByID(id: string): Promise<Product | undefined> {
    return this.productsRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productsRepository.find();
    } catch (error) {
      throw new Error('Erro ao buscar linhas de produção: ' + error.message);
    }
  }


}