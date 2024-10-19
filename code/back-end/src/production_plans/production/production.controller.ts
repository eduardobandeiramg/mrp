import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductionDto } from '../dto/create-production.dto';
import { ProductionService } from './production.service';

@ApiTags('production')
@ApiBearerAuth()
@Controller('production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Post()
  create(@Body() createProductionDto: CreateProductionDto) {
    return this.productionService.create(createProductionDto);
  }

  @Patch(':id/start')
  @ApiOperation({ summary: 'Inicia a produção' })
  startProduction(@Param('id') id: string) {
    return this.productionService.startProduction(id);
  }

  @Patch(':id/end')
  @ApiOperation({ summary: 'Finaliza a produção' })
  endProduction(@Param('id') id: string) {
    return this.productionService.endProduction(id);
  }
}
