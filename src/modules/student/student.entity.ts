import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Job } from "../job/job.entity";
import { Curriculum } from "../curriculum/curriculum.entity";

@Entity("students")
export class Student {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => User, (user) => user.student)
  user: User;

  @Column({
    nullable: true,
  })
  phone?: string;

  @Column({
    nullable: true,
  })
  github_url?: string;

  @Column({
    nullable: true,
  })
  linkedin_url?: string;

  @Column({
    nullable: true,
  })
  portfolio_url?: string;

  @Column({
    nullable: true,
  })
  birth_date?: Date;

  @ManyToMany(() => Job)
  @JoinTable({
    name: "jobs_applicants",
    joinColumns: [{ name: "student_id" }],
    inverseJoinColumns: [{ name: "job_id" }],
  })
  jobs_applied: Job[];

  @OneToOne(() => Curriculum, (curriculum) => curriculum.student)
  curriculum: Curriculum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_At: Date;
}
