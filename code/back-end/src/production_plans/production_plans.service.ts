import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductionPlanDto } from './dto/create-production_plan.dto';
import { UpdateProductionPlanDto } from './dto/update-production_plan.dto';
import { Production } from './entities/production.entity';
import { ProductionPlan } from './entities/production_plan.entity';

@Injectable()
export class ProductionPlansService {
  constructor(
    @InjectRepository(ProductionPlan)
    private productionPlanRepository: Repository<ProductionPlan>,

    @InjectRepository(Production)
    private productionRepository: Repository<Production>,
  ) {}

  async createProductionPlan(createProductionPlanDto: CreateProductionPlanDto) {
    const productionPlan = this.productionPlanRepository.create(
      createProductionPlanDto,
    );
    return this.productionPlanRepository.save(productionPlan);
  }

  async findAll(startDate: string, endDate: string) {
    return this.productionPlanRepository.find({
      where: { datePrev: Between(startDate, endDate) },
    });
  }

  async findOneProductionPlan(id: string) {
    const productionPlan = await this.productionPlanRepository.findOne({
      where: { id },
    });
    if (!productionPlan) {
      throw new NotFoundException(`Production Plan with id ${id} not found`);
    }
    return productionPlan;
  }

  async updateProductionPlan(
    id: string,
    updateProductionPlanDto: UpdateProductionPlanDto,
  ) {
    const productionPlan = await this.productionPlanRepository.preload({
      id: id,
      ...updateProductionPlanDto,
    });

    if (!productionPlan) {
      throw new NotFoundException(`Production Plan with id ${id} not found`);
    }

    return this.productionPlanRepository.save(productionPlan);
  }

  async removeProductionPlan(id: string) {
    const result = await this.productionPlanRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Production Plan with id ${id} not found`);
    }
  }

  // Métodos de produção
  async startProduction(id: string) {
    const production = await this.productionRepository.findOne({
      where: { id },
    });
    if (!production) {
      throw new NotFoundException(`Production with id ${id} not found`);
    }

    production.dateInit = new Date();
    return this.productionRepository.save(production);
  }

  async endProduction(id: string) {
    const production = await this.productionRepository.findOne({
      where: { id },
    });
    if (!production) {
      throw new NotFoundException(`Production with id ${id} not found`);
    }

    production.dateEnd = new Date();
    return this.productionRepository.save(production);
  }
}
