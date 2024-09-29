import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get()
	async getProductByDescription(description: string): Promise<Product> {
	  return this.productsService.findOneProduct(description); // Utilizando um método para buscar todos os produtos
	}

	@Get()
	async getProductByUID(id: string): Promise<Product> {
	  return this.productsService.findOneByID(id); // Utilizando um método para buscar todos os produtos
	}

	@Post()
	async create(@Body() createPrdDTO: CreateProductDTO): Promise<void> {
	  return this.productsService.create(createPrdDTO);
	}
}
