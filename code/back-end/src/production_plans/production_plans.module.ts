// production_plans.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionPlan } from './entities/production_plan.entity';
import { ProductionPlansController } from './production_plans.controller';
import { ProductionPlansService } from './production_plans.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionPlan])],
  controllers: [ProductionPlansController],
  providers: [ProductionPlansService],
})
export class ProductionPlansModule {}
