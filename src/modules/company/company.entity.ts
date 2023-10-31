import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CompanySize } from "./enums";
import { User } from "../user/user.entity";
import { Job } from "../job/job.entity";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: true,
  })
  logo_url?: string;

  @Column({
    nullable: true,
  })
  website_url?: string;

  @Column({
    nullable: true,
  })
  description?: string;

  @Column({
    nullable: true,
  })
  phone?: string;

  @Column({
    type: "enum",
    enum: CompanySize,
  })
  size: CompanySize;

  @OneToMany(() => Job, (job) => job.owner_company)
  jobs_posted: Job[];

  @OneToOne(() => User, (user) => user.company)
  user: User;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;
}
