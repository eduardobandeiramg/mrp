import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Line {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false, unique: true })
    name: string;

    constructor(line: Partial<Line>) {
        Object.assign(this, line);
    }
}
