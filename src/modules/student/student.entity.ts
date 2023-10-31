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
import { StudentShift } from "./enums";

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

  @Column({
    type: "enum",
    enum: StudentShift,
  })
  shift: StudentShift;

  @OneToMany(() => JobApplicant, (jobApplicant) => jobApplicant.student)
  jobs_applied: JobApplicant[];

  @Column()
  curriculum_id: string;

  @OneToOne(() => Curriculum, (curriculum) => curriculum.student)
  @JoinColumn({ name: "curriculum_id" })
  curriculum: Curriculum;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;
}
