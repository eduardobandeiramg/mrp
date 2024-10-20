import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Get('less-productions')
  @ApiOperation({
    summary:
      'Busca produtos que possuem menos produções que a quantidade definida no plano de produção',
  })
  findProductsWithLessProductions() {
    return this.productionService.findProductsWithLessProductions();
  }

  @Get('null-dates')
  @ApiOperation({
    summary: 'Busca todas as produções com data de início e fim nulas',
  })
  findProductsWithNullDates() {
    return this.productionService.findProductsWithNullDates();
  }

  @Get('init-no-end')
  @ApiOperation({
    summary:
      'Busca todas as produções com data de início existente e data de fim nula',
  })
  findProductsWithInitButNoEnd() {
    return this.productionService.findProductsWithInitButNoEnd();
  }
}
