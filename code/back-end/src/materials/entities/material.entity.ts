import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Material {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 8 })
    code: string;

    @Column()
    description: string;

    constructor(material: Partial<Material>) {
        Object.assign(this, material);
    }
}
