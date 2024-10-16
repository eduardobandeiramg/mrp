import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductionPlanDto } from './dto/create-production_plan.dto';
import { UpdateProductionPlanDto } from './dto/update-production_plan.dto';
import { ProductionPlansService } from './production_plans.service';

@ApiTags('production-plans')
@Controller('production-plans')
export class ProductionPlansController {
  constructor(
    private readonly productionPlansService: ProductionPlansService,
  ) {}

  @Post()
  create(@Body() createProductionPlanDto: CreateProductionPlanDto) {
    return this.productionPlansService.create(createProductionPlanDto);
  }

  @Get()
  findAll() {
    return this.productionPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionPlansService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductionPlanDto: UpdateProductionPlanDto,
  ) {
    return this.productionPlansService.update(+id, updateProductionPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionPlansService.remove(+id);
  }
}
