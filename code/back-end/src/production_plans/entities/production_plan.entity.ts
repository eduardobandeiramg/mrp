import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Line } from '../../line/entities/line.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class ProductionPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.productionPlans, {
    eager: true,
  })
  product: Product;

  @Column({ type: 'date' })
  datePrev: Date;

  @Column({ type: 'int' })
  qtd: number;

  @ManyToOne(() => Line, (line) => line.productionPlans, { eager: true })
  line: Line;
}
