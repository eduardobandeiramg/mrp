import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductionPlan } from '../../production_plans/entities/production_plan.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Production {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.productions, { eager: true })
  product: Product;

  @ManyToOne(
    () => ProductionPlan,
    (productionPlan) => productionPlan.productions,
    { eager: true },
  )
  productionPlan: ProductionPlan;

  @Column({ type: 'date', nullable: true })
  dateInit: Date;

  @Column({ type: 'date', nullable: true })
  dateEnd: Date;
}
