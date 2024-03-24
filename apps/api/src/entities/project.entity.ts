import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: Relation<User>;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({
    joinColumn: {
      name: 'project_id',
    },
    inverseJoinColumn: {
      name: 'user_id',
    },
  })
  members: Relation<User>[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Relation<Task>[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
