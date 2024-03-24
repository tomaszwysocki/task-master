import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

export enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in progress',
  REVIEW = 'review',
  DONE = 'done',
  CLOSED = 'closed',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'due_date' })
  dueDate: Date;

  @Column({ name: 'tracked_time' })
  trackedTime: number;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  status: TaskStatus;

  @ManyToMany(() => User, (user) => user.tasks)
  assignedUsers: Relation<User>[];

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: 'project_id' })
  project: Relation<Project>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
