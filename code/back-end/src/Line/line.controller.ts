import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LineService } from './line.service';

@ApiTags('line')
@ApiBearerAuth()
@Controller('line')
export class LineController {
	constructor(private readonly lineService: LineService) {}

}
