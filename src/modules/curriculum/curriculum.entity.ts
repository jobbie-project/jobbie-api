import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EducationLevel, JobType } from "./enums";
import { TechStack } from "../tech-stacks/tech-stacks.entity";
import { Student } from "../student/student.entity";

@Entity("curriculums")
export class Curriculum {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Student, (student) => student.curriculum)
  student: Student;

  @ManyToMany(() => TechStack, (tech_stack) => tech_stack.curriculums)
  tech_stacks: TechStack[];

  @Column({
    type: "simple-json",
  })
  previous_experience: {
    company_name: string;
    position: string;
    start_date: Date;
    end_date?: Date;
    type: JobType;
    location?: {
      city: string;
      state: string;
    };
    description?: string;
  }[];

  @Column({
    type: "simple-json",
  })
  education: {
    institution_name: string;
    degree: string;
    level: EducationLevel;
    start_date: Date;
    end_date?: Date;
    location?: {
      city: string;
      state: string;
    };
    description?: string;
  }[];
}
