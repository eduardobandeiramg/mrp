import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Line } from '../../Line/entities/line.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  code: string;

  @ManyToOne(() => Line, line => line.products, { eager: true })
  line: Line;
}