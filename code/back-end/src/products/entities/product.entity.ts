import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Line } from '../../line/entities/line.entity';
import { BuildOfMaterial } from 'src/build_of_materials/entities/build_of_material.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  code: string;

  @Column({ default: true })
  isActive: boolean;
}