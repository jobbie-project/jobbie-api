import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompanySize } from "./enums";
import { User } from "../user/user.entity";
import { Job } from "../job/job.entity";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: CompanySize,
  })
  size: CompanySize;

  @OneToMany(() => Job, (job) => job.owner_company)
  jobs_posted: Job[];

  @OneToOne(() => User, (user) => user.company)
  user: User;
}