import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Line } from '../line/entities/line.entity';
import { Product } from '../products/entities/product.entity';
import { CreateProductionPlanDto } from './dto/create-production_plan.dto';
import { UpdateProductionPlanDto } from './dto/update-production_plan.dto';
import { ProductionPlan } from './entities/production_plan.entity';

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

  findAll() {
    return `This action returns all productionPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionPlan`;
  }

  update(id: number, updateProductionPlanDto: UpdateProductionPlanDto) {
    return `This action updates a #${id} productionPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionPlan`;
  }
}
