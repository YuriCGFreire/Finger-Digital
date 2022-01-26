import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    name: string;

    @Column({ type: "varchar" })
    email: string;

    @Column({type: "varchar"})
    password: string;
}