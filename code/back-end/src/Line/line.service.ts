import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';
import { Line } from './entities/line.entity';

@Injectable()
export class LineService {
  constructor(
    // @InjectRepository(Product)
    // private productsRepository: Repository<Product>,

    @InjectRepository(Line)
    private readonly linesRepository: Repository<Line>,
  ) {}

  async findOneByID(lineId: string): Promise<Line | undefined> {
    return this.linesRepository.findOne({
      where: { lineId },
    });
  }

  async create(createLineDto: CreateLineDto): Promise<Line> {
    const { name } = createLineDto;

    const newLine = this.linesRepository.create({
      name,
    });

    try {
      return await this.linesRepository.save(newLine);
    } catch (error) {
      throw new Error('Erro ao criar linha de produção: ' + error.message);
    }
  }

  async update(id: string, updateLineDto: UpdateLineDto): Promise<Line> {
    const findedLine = await this.findOneByID(id);
    if (!findedLine) {
      throw new NotFoundException('Product not found');
    }
    const { name } = updateLineDto;

    if(name !== undefined){
      findedLine.name = name;
    }

    await this.linesRepository.save(findedLine);

    return findedLine;
  }

  remove(id: string): void | PromiseLike<void> {
	  throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Line[]> {
    try {
      return await this.linesRepository.find();
    } catch (error) {
      throw new Error('Erro ao buscar linhas de produção: ' + error.message);
    }
  }

}