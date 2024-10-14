import { Line } from "src/line/entities/line.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductionPlan {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    product: Product;

    @Column({ nullable: false })
    datePrev: Date;

    @Column({ default: 0 })
    qtd: number;

    @Column({ nullable: false })
    line: Line;

    constructor(material: Partial<ProductionPlan>) {
        Object.assign(this, material);
    }
}
