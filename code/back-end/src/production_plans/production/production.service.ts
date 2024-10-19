import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { CreateProductionDto } from '../dto/create-production.dto';
import { Production } from '../entities/production.entity';
import { ProductionPlan } from '../entities/production_plan.entity';

@Injectable()
export class ProductionService {
  constructor(
    @InjectRepository(Production)
    private readonly productionRepository: Repository<Production>,

    @InjectRepository(ProductionPlan)
    private readonly productionPlanRepository: Repository<ProductionPlan>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductionDto: CreateProductionDto) {
    const { productId, productionPlanId, ...rest } = createProductionDto;

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    const productionPlan = await this.productionPlanRepository.findOne({
      where: { id: productionPlanId },
    });

    if (!productionPlan) {
      throw new Error('Plano de Produção não encontrado');
    }

    const production = this.productionRepository.create({
      ...rest,
      product,
      productionPlan,
    });

    this.sendRequestToStock();

    return this.productionRepository.save(production);
  }

  async sendRequestToStock() {
    // TODO: Lógica para enviar requisição ao estoque
  }

  async startProduction(id: string): Promise<Production> {
    const production = await this.productionRepository.findOne({
      where: { id },
    });

    if (!production) {
      throw new NotFoundException(`Production with ID ${id} not found`);
    }

    production.dateInit = new Date();
    return this.productionRepository.save(production);
  }

  async endProduction(id: string): Promise<Production> {
    const production = await this.productionRepository.findOne({
      where: { id },
    });

    if (!production) {
      throw new NotFoundException(`Production with ID ${id} not found`);
    }

    production.dateEnd = new Date();
    return this.productionRepository.save(production);
  }
}
