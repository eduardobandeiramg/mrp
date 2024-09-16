import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false, unique: true})
    username: string;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: false, select: false})
    password: string;

    @Column()
    isActive: boolean;

    constructor(user: Partial<User>) {
        Object.assign(this, user);
    }
}
