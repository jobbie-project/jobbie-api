import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcrypt";
import { UserRole } from "./enums";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ select: false })
  password_hash: string;

  @Column({ nullable: true })
  email_confirmation_code: string;

  @Column({ default: false })
  email_validated: boolean;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  role: UserRole;

  @Column({ select: false })
  document: string;

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
