import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductionPlanDto } from './dto/create-production_plan.dto';
import { UpdateProductionPlanDto } from './dto/update-production_plan.dto';
import { ProductionPlansService } from './production_plans.service';

@Controller('production-plans')
export class ProductionPlansController {
  constructor(
    private readonly productionPlansService: ProductionPlansService,
  ) {}

  @Post()
  create(@Body() createProductionPlanDto: CreateProductionPlanDto) {
    return this.productionPlansService.createProductionPlan(
      createProductionPlanDto,
    );
  }

  @Get()
  findAll(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.productionPlansService.findAll(startDate, endDate);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionPlansService.findOneProductionPlan(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductionPlanDto: UpdateProductionPlanDto,
  ) {
    return this.productionPlansService.updateProductionPlan(
      id,
      updateProductionPlanDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionPlansService.removeProductionPlan(id);
  }

  // Rotas relacionadas a produção
  @Patch('production/start/:id')
  startProduction(@Param('id') id: string) {
    return this.productionPlansService.startProduction(id);
  }

  @Patch('production/end/:id')
  endProduction(@Param('id') id: string) {
    return this.productionPlansService.endProduction(id);
  }
}
