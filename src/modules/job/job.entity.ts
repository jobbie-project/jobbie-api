import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Student } from "../student/student.entity";
import { Company } from "../company/company.entity";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  salary?: number;

  @ManyToMany(() => Student, (student) => student.jobs_applied)
  applicants: Student[];

  @OneToMany(() => Company, (company) => company.jobs_posted)
  @JoinColumn({ name: "owner_company_id" })
  owner_company: Company;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_At: Date;
}
