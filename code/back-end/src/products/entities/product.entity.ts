import { Line } from "src/Line/entities/line.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false, unique: true })
    description: string;

    @Column({ nullable: false, unique: true })
    code: string;

    @Column({ nullable: false, select: false })
    line: Line;

    constructor(product: Partial<Product>) {
        Object.assign(this, product);
    }
}
