import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Line } from '../../line/entities/line.entity';
import { Product } from '../../products/entities/product.entity';
import { Production } from './production.entity';

@Entity()
export class ProductionPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.productionPlans)
  product: Product;

  @Column({ type: 'date' })
  datePrev: Date;

  @Column({ type: 'int' })
  qtd: number;

  @ManyToOne(() => Line, (line) => line.productionPlans)
  line: Line;

  @OneToMany(() => Production, (production) => production.productionPlan)
  productions: Production[];
}
