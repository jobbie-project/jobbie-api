import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Student } from "../student/student.entity";
import { Company } from "../company/company.entity";
import { ContractType, JobStatus, JobTime, JobType } from "@/common/enums";
import { User } from "../user/user.entity";
import { JobApplicant } from "../job_applicants/job-applicants.entity";
import { FatecCourse } from "../fatec/fatec-course.entity";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  code: string;

  @Column()
  description: string;

  @Column()
  position: string;

  @Column({ type: "float" })
  salary: number;

  @Column({ nullable: true })
  owner_name: string;

  @Column()
  company_name: string;

  @Column()
  owner_email: string;

  @Column({
    type: "enum",
    enum: JobStatus,
    default: JobStatus.OPEN,
  })
  status: JobStatus;

  @Column({
    type: "simple-json",
    nullable: true,
  })
  location: {
    city: string;
    state: string;
  };

  @Column({ nullable: true })
  num_positions: string;

  @Column({ type: "enum", enum: JobType })
  type: JobType;

  @Column({ type: "enum", enum: ContractType })
  contract_type: ContractType;

  @Column({ type: "enum", enum: JobTime })
  job_time: JobTime;

  @Column()
  fatec_course_id: string;

  @ManyToOne(() => FatecCourse, (fatec_courses) => fatec_courses.jobs)
  @JoinColumn({ name: "fatec_course_id" })
  fatec_course: FatecCourse;

  @Column({
    type: "boolean",
  })
  has_sorting: boolean;

  @OneToMany(() => JobApplicant, (jobApplicant) => jobApplicant.job)
  applicants: JobApplicant[];

  @ManyToOne(() => Company, (company) => company.jobs_posted)
  @JoinColumn({ name: "owner_company_id" })
  owner_company: Company;

  @ManyToOne(() => User, (user) => user.jobs_posted)
  @JoinColumn({ name: "owner_admin_id" })
  owner_admin: User;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;
}
