import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EducationLevel } from "./enums";
import { TechStack } from "../tech-stacks/tech-stacks.entity";
import { Student } from "../student/student.entity";
import { FatecInstitutions } from "../fatec/fatec-institution.entity";
import { FatecCourses } from "../fatec/fatec-course.entity";

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
    location?: {
      city: string;
      state: string;
    };
    description?: string;
  }[];

  @OneToMany(() => FatecInstitutions, (fatec_institutions) => fatec_institutions.curriculums)
  fatec_institution: string;

  @OneToMany(() => FatecCourses, (fatec_courses) => fatec_courses.curriculums)
  fatec_course: string;

  @Column()
  fatec_cycle: string;

  @Column()
  fatec_start_date: Date;

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
  }[];

  @Column({
    type: "simple-array",
  })
  certifications: string[];
}
