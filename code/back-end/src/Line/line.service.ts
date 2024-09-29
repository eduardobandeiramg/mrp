import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';
import { Line } from './entities/line.entity';

@Injectable()
export class LineService {
  findOneById(id: string): Line | PromiseLike<Line> {
	  throw new Error('Method not implemented.');
  }
  update(id: string, updateLineDto: UpdateLineDto): Line | PromiseLike<Line> {
	  throw new Error('Method not implemented.');
  }
  remove(id: string): void | PromiseLike<void> {
	  throw new Error('Method not implemented.');
  }
  findAll(): Line[] | PromiseLike<Line[]> {
	  throw new Error('Method not implemented.');
  }
  create(createLineDto: CreateLineDto): Line | PromiseLike<Line> {
	  throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Line)
    private linesRepository: Repository<Line>,
  ) {}

}