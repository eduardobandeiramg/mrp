import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Line {
  @PrimaryGeneratedColumn('uuid')
  lineId: string;

  @Column()
  name: string;
}