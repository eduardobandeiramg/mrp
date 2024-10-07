import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Line {
  @PrimaryGeneratedColumn('uuid')
  lineId: string;

  @Column()
  name: string;
}