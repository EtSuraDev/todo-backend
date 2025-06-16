import { User } from "../../user/user entitie/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";


enum Status {
    active = "ongoing",
    done = "completed"
}

@Entity()
export class Todo {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    todo: string

    @Column({ type: "enum", enum: Status})
    status: Status

    @Column()
    description: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => User, user => user.todos, { onDelete: 'CASCADE' })
    user: User;
}