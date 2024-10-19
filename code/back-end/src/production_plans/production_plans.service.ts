import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(
    createProductionPlanDto: CreateProductionPlanDto,
  ): Promise<ProductionPlan> {
    const { productId, datePrev, qtd, lineId } = createProductionPlanDto;

    // Verificando se o produto existe
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let line = null;
    if (lineId) {
      // Verificando se a linha existe
      line = await this.linesRepository.findOneBy({ lineId: lineId });
      if (!line) {
        throw new NotFoundException('Line not found');
      }
    }

    const productionPlan = this.productionPlansRepository.create({
      product,
      datePrev,
      qtd,
      line,
    });

    return await this.productionPlansRepository.save(productionPlan);
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
