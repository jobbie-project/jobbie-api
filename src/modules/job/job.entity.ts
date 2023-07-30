import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToOne(() => Company, (company) => company.jobs_posted)
  @JoinColumn({ name: "owner_company_id" })
  owner_company: Company;
}
