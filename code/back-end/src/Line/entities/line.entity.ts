import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Line {
  @PrimaryGeneratedColumn('uuid')
  lineId: string;

  @Column()
  name: string;

  @OneToMany(() => Product, product => product.line)
  products: Product[];
}