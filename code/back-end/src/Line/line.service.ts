import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Line } from './entities/line.entity';

@Injectable()
export class LineService {
  constructor(
    @InjectRepository(Line)
    private linesRepository: Repository<Line>,
  ) {}

}