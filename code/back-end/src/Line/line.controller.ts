import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateLineDto } from '../line/dto/create-line.dto';
import { UpdateLineDto } from '../line/dto/update-line.dto';
import { Line } from './entities/line.entity';
import { LineService } from './line.service';

@ApiTags('line')
@ApiBearerAuth()
@Controller('line')
export class LineController {
  constructor(private readonly lineService: LineService) {}

  // Create a new Line
  @Post()
  async create(@Body() createLineDto: CreateLineDto): Promise<Line> {
    return this.lineService.create(createLineDto);
  }

  // Get all Lines
  @Get()
  async getAll(): Promise<Line[]> {
    return this.lineService.findAll();
  }

  // Get a Line by ID
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Line> {
    return this.lineService.findOneByID(id);
  }

  // Update a Line by ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLineDto: UpdateLineDto,
  ): Promise<Line> {
    return this.lineService.update(id, updateLineDto);
  }

  // Delete a Line by ID
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.lineService.remove(id);
  }
}