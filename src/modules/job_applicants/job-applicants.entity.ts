import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Job } from "../job/job.entity";
import { Student } from "../student/student.entity";

@Entity("jobs_applicants")
export class JobApplicant {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: false })
  was_sended: boolean;

  @Column()
  student_id: string;

  @Column()
  job_id: string;

  @ManyToOne(() => Job, (job) => job.applicants)
  @JoinColumn({ name: "job_id" })
  job: Job;

  @ManyToOne(() => Student, (student) => student.jobs_applied)
  @JoinColumn({ name: "student_id" })
  student: Student;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;
}
