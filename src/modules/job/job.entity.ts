import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Student } from "../student/student.entity";
import { Company } from "../company/company.entity";
import { ContractType, JobStatus, JobTime, JobType } from "@/common/enums";
import { User } from "../user/user.entity";

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

  @Column({ nullable: true })
  num_positions: string;

  @Column({ type: "enum", enum: JobType })
  type: JobType;

  @Column({ type: "enum", enum: ContractType })
  contract_type: ContractType;

  @Column({ type: "enum", enum: JobTime })
  job_time: JobTime;

  @ManyToMany(() => Student, (student) => student.jobs_applied)
  applicants: Student[];

  @ManyToOne(() => Company, (company) => company.jobs_posted)
  @JoinColumn({ name: "owner_company_id" })
  owner_company: Company;

  @ManyToOne(() => User, (user) => user.jobs_posted)
  @JoinColumn({ name: "owner_admin_id" })
  owner_admin: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
