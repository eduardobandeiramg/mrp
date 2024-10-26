import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    production.status = ProductionStatus.A_PRODUZIR;

    return this.productionRepository.save(production);
  }

  async sendRequestToStock() {
    // TODO: Lógica para enviar requisição ao estoque
  }

  async stopProduction(id: string): Promise<Production> {
    const production = await this.productionRepository.findOne({
      where: { id },
      relations: ['product', 'productionPlan'],
    });

    if (!production) {
      throw new NotFoundException(`Production with ID ${id} not found`);
    }

    this.sendRequestToStock;
    production.status = ProductionStatus.AGUARDANDO_PECAS;

    return this.productionRepository.save(production);
  }

  async startProduction(id: string): Promise<Production> {
    const production = await this.productionRepository.findOne({
      where: { id },
      relations: ['product', 'productionPlan'],
    });

    if (!production) {
      throw new NotFoundException(`Production with ID ${id} not found`);
    }

    if (production.status !== ProductionStatus.A_PRODUZIR) {
      throw new BadRequestException(
        `Cannot start production. Current status is ${production.status}, expected status is A_PRODUZIR`,
      );
    }

    production.dateInit = new Date();
    production.status = ProductionStatus.EM_PRODUCAO;

    return this.productionRepository.save(production);
  }

  async endProduction(id: string): Promise<Production> {
    const production = await this.productionRepository.findOne({
      where: { id },
      relations: ['product', 'productionPlan'],
    });

    if (!production) {
      throw new NotFoundException(`Production with ID ${id} not found`);
    }

    if (production.status !== ProductionStatus.EM_PRODUCAO) {
      throw new BadRequestException(
        `Cannot finalize production. Current status is ${production.status}, expected status is EM_PRODUCAO`,
      );
    }

    production.dateEnd = new Date();
    production.status = ProductionStatus.FINALIZADO;

    return this.productionRepository.save(production);
  }

  async findProductsWithLessProductions(): Promise<ProductionPlan[]> {
    const productionPlans = await this.productionPlanRepository.find({
      relations: ['product', 'productions'],
    });

    return productionPlans
      .filter((plan) => plan.productions.length < plan.qtd)
      .sort(
        (a, b) =>
          new Date(a.datePrev).getTime() - new Date(b.datePrev).getTime(),
      );
  }

  async findProductsWithNullDates(): Promise<Production[]> {
    return this.productionRepository.find({
      where: { dateInit: null, dateEnd: null },
      relations: ['product', 'productionPlan'],
    });
  }

  async findProductsWithInitButNoEnd(): Promise<Production[]> {
    return this.productionRepository.find({
      where: { dateInit: Not(null), dateEnd: null },
      relations: ['product', 'productionPlan'],
    });
  }
}
