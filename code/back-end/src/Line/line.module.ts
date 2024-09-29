import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Line } from './entities/line.entity';
import { LineController } from './line.controller';
import { LineService } from './line.service';

@Module({
  imports: [TypeOrmModule.forFeature([Line])],
  controllers: [LineController],
  providers: [LineService],
  exports: [TypeOrmModule], // Exporte o TypeOrmModule para que outros módulos possam usar o LineRepository
})
export class LineModule {}