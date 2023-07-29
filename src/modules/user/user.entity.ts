import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./enums";
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
    nullable: true,
  })
  role: UserRole;

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
