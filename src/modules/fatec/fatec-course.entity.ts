import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curriculum } from "../curriculum/curriculum.entity";

@Entity("fatec_courses")
export class FatecCourse {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Curriculum, (curriculum) => curriculum.fatec_course)
  curriculums: Curriculum[];
}
