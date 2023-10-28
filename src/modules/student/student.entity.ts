import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Job } from "../job/job.entity";
import { Curriculum } from "../curriculum/curriculum.entity";
import { JobApplicant } from "../job_applicants/job-applicants.entity";

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

  @OneToMany(() => JobApplicant, (jobApplicant) => jobApplicant.student)
  jobs_applied: JobApplicant[];

  @Column()
  curriculum_id: string;

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
