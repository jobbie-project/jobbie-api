import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Job } from "../job/job.entity";

@Entity("students")
export class Student {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => User, (user) => user.student)
  user: User;

  @ManyToMany(() => Job)
  @JoinTable({
    name: "jobs_applicants",
    joinColumns: [{ name: "student_id" }],
    inverseJoinColumns: [{ name: "job_id" }],
  })
  jobs_applied: Job[];

  // @OneToOne(()=> Curriculum, (curriculum) => curriculum.student)
  // curriculum: Curriculum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_At: Date;
}
