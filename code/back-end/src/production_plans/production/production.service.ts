import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { CreateProductionDto } from '../dto/create-production.dto';
import { Production } from '../entities/production.entity';
import { ProductionPlan } from '../entities/production_plan.entity';
import { ProductionStatus } from '../enums/status.enum';

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
    const { productId, productionPlanId, dateInit, dateEnd } =
      createProductionDto;

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    const productionPlan = await this.productionPlanRepository.findOne({
      where: { id: productionPlanId },
    });

    if (!product || !productionPlan) {
      throw new Error('Produto ou Plano de Produção não encontrado.');
    }

    const production = new Production();
    production.product = product;
    production.productionPlan = productionPlan;
    production.dateInit = dateInit ? new Date(dateInit) : null;
    production.dateEnd = dateEnd ? new Date(dateEnd) : null;

    // Definir o status como "a produzir" ao criar
    production.status = ProductionStatus.A_PRODUZIR;

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

  async findProductsWithLessProductions(): Promise<any[]> {
    const productionPlans = await this.productionPlanRepository.find({
      relations: ['product', 'productions'],
    });

    const result = productionPlans.filter((plan) => {
      return plan.productions.length < plan.qtd;
    });

    return result
      .map((plan) => ({
        productId: plan.product.id,
        productDescription: plan.product.description,
        productionCount: plan.productions.length,
        requiredQuantity: plan.qtd,
        plannedDate: plan.datePrev,
      }))
      .sort(
        (a, b) =>
          new Date(a.plannedDate).getTime() - new Date(b.plannedDate).getTime(),
      );
  }

  async findProductsWithNullDates(): Promise<Production[]> {
    return this.productionRepository.find({
      where: { dateInit: null, dateEnd: null },
      relations: ['product'],
    });
  }

  async findProductsWithInitButNoEnd(): Promise<Production[]> {
    return this.productionRepository.find({
      where: { dateInit: Not(null), dateEnd: null },
      relations: ['product'],
    });
  }
}
