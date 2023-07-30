import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./enums";
import { Student } from "../student/student.entity";
import { Company } from "../company/company.entity";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password_hash: string;

  @Column({ nullable: true })
  email_confirmation_token: string;

  @Column({ default: false })
  email_validated: boolean;

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
}
