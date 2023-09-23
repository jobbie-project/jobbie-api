import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "./enums";
import { Student } from "../student/student.entity";
import { Company } from "../company/company.entity";
import { Job } from "../job/job.entity";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({
    select: false,
  })
  password_hash: string;

  @Column({ nullable: true, select: false })
  email_confirmation_token: string;

  @Column({ default: false })
  email_validated: boolean;

  @Column({ default: false })
  profile_completed: boolean;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  role: UserRole;

  @OneToOne(() => Student, (student) => student.user, {
    nullable: true,
  })
  @JoinColumn({ name: "student_id" })
  student?: Student;

  @OneToOne(() => Company, (company) => company.user, {
    nullable: true,
  })
  @JoinColumn({ name: "company_id" })
  company?: Company;

  @OneToMany(() => Job, (job) => job.owner_admin)
  jobs_posted: Job[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
