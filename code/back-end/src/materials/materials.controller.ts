import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateMaterialStockDto } from './dto/update-material-stock.dto';

@ApiTags('materials')
@ApiBearerAuth()
@Controller('materials')
export class MaterialsController {
	constructor(private readonly materialsService: MaterialsService) {}

	@Post()
	@HttpCode(204)
	create(@Body() createMaterialDto: CreateMaterialDto) {
		return this.materialsService.create(createMaterialDto);
	}
	
	@Put(':id')
	update(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
		return this.materialsService.update(id, updateMaterialDto);
	}

	@Get()
	findAll() {
		return this.materialsService.findAll();
	}

	@Get(':id')
	findById(@Param('id') id: string) {
		return this.materialsService.findById(id);
	}

	@HttpCode(204)
	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.materialsService.delete(id);
	}

	@HttpCode(204)
	@Patch('/stock/update')
	updateStock(@Body() updateMaterialStockDto: UpdateMaterialStockDto) {
		return this.materialsService.updateStock(updateMaterialStockDto);
	}

	@HttpCode(204)
	@Patch('/stock/add')
	addStock(@Body() updateMaterialStockDto: UpdateMaterialStockDto) {
		return this.materialsService.addStock(updateMaterialStockDto);
	}
}
