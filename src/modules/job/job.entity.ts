import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Student } from "../student/student.entity";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToMany(() => Student, (student) => student.jobs_applied)
  applicants: Student[];
}
