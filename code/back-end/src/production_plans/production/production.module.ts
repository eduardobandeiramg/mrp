import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionPlan } from '../../production_plans/entities/production_plan.entity';
import { ProductsModule } from '../../products/products.module';
import { Production } from '../entities/production.entity';
import { ProductionController } from './production.controller';
import { ProductionService } from './production.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Production, ProductionPlan]),
    ProductsModule,
  ],
  controllers: [ProductionController],
  providers: [ProductionService],
})
export class ProductionModule {}
