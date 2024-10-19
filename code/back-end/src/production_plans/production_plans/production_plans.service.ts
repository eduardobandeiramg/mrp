import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Line } from '../../line/entities/line.entity';
import { Product } from '../../products/entities/product.entity';
import { CreateProductionPlanDto } from '../dto/create-production_plan.dto';
import { ProductionPlan } from '../entities/production_plan.entity';

@Injectable()
export class ProductionPlansService {
  constructor(
    @InjectRepository(ProductionPlan)
    private productionPlansRepository: Repository<ProductionPlan>,

    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(Line)
    private linesRepository: Repository<Line>,
  ) {}

  async create(createProductionPlanDto: CreateProductionPlanDto) {
    const { qtd, datePrev, productId } = createProductionPlanDto;

    const product = await this.productsRepository.findOneOrFail({
      where: { id: productId },
    });

    const productionPlan = new ProductionPlan();
    productionPlan.qtd = qtd;

    productionPlan.datePrev = new Date(datePrev);

    if (!isNaN(productionPlan.datePrev.getTime())) {
      productionPlan.datePrev = new Date(
        productionPlan.datePrev.toISOString().split('T')[0],
      );
    } else {
      throw new Error('Invalid date value provided for datePrev');
    }

    productionPlan.product = product;

    return this.productionPlansRepository.save(productionPlan);
  }

  async findByDates(startDate: string, endDate: string) {
    try {
      const query =
        this.productionPlansRepository.createQueryBuilder('productionPlan');

      if (startDate) {
        query.andWhere('productionPlan.datePrev >= :startDate', { startDate });
      }

      if (endDate) {
        query.andWhere('productionPlan.datePrev <= :endDate', { endDate });
      }

      const productionPlans = await query.getMany();

      if (productionPlans.length === 0) {
        throw new NotFoundException(
          'No production plans found between the given dates.',
        );
      }

      return productionPlans;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneById(id: string) {
    try {
      const productionPlan = await this.productionPlansRepository.findOne({
        where: { id },
      });
      if (!productionPlan) {
        throw new NotFoundException(`Production Plan with ID ${id} not found`);
      }
      return productionPlan;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: string): Promise<void> {
    const productionPlan = await this.productionPlansRepository.findOne({
      where: { id },
    });

    if (!productionPlan) {
      throw new Error(`ProductionPlan with id ${id} not found`);
    }

    await this.productionPlansRepository.delete(id);
  }
}
