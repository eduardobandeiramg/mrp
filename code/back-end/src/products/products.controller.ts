import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}


}
