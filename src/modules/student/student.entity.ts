import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Job } from "../job/job.entity";
import { Curriculum } from "../curriculum/curriculum.entity";

@Entity("students")
export class Student {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({
    nullable: true,
  })
  phone?: string;

  @Column({
    nullable: true,
  })
  birth_date?: Date;

  @ManyToMany(() => Job, (job) => job.applicants)
  jobs_applied: Job[];

  @OneToOne(() => Curriculum, (curriculum) => curriculum.student)
  @JoinColumn({ name: "curriculum_id" })
  curriculum: Curriculum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
