import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./enums";
import { Student } from "../student/student.entity";
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

  @OneToOne(() => Student, (student) => student.user)
  student: Student;

  // @Column({ select: false, nullable: true })
  // document: string;

  /*
  @Column({nullable: true})
  @OneToMany(() => Job, (job) => job.owner_user)
  jobs_posted?: Job[];

  @Column({nullable: true})
  @ManyToMany(() => Job, (job) => job.applicants)
  @JoinTable({name: "jobs_applicants"})
  jobs_applied?: Job[];
  */
}
