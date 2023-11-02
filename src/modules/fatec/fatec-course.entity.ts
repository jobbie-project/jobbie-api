import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Curriculum } from "../curriculum/curriculum.entity";
import { Job } from "../job/job.entity";

@Entity("fatec_courses")
export class FatecCourse {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({
    default: "NONE",
  })
  abbreviation: string;

  @OneToMany(() => Curriculum, (curriculum) => curriculum.fatec_course)
  curriculums: Curriculum[];

  @OneToMany(() => Job, (job) => job.fatec_course)
  jobs: Job[];
}
