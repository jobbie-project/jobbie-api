import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Curriculum } from "../curriculum/curriculum.entity";

@Entity("fatec_institutions")
export class FatecInstitution {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Curriculum, (curriculum) => curriculum.fatec_institution)
  curriculums: Curriculum[];
}
