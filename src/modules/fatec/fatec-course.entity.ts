import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Curriculum } from "../curriculum/curriculum.entity";

@Entity("fatec_courses")
export class FatecCourse {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Curriculum, (curriculum) => curriculum.fatec_course)
  curriculums: Curriculum[];
}
