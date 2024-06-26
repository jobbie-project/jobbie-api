import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EducationLevel } from "./enums";
import { TechStack } from "../tech-stacks/tech-stacks.entity";
import { Student } from "../student/student.entity";
import { FatecInstitution } from "../fatec/fatec-institution.entity";
import { FatecCourse } from "../fatec/fatec-course.entity";

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

  @ManyToOne(() => FatecInstitution, (fatec_institutions) => fatec_institutions.curriculums)
  @JoinColumn({ name: "fatec_institution_id" })
  fatec_institution: FatecInstitution;

  @ManyToOne(() => FatecCourse, (fatec_courses) => fatec_courses.curriculums)
  @JoinColumn({ name: "fatec_course_id" })
  fatec_course: FatecCourse;

  @Column()
  fatec_cycle: number;

  @Column()
  fatec_start_date: Date;

  @Column({
    type: "simple-json",
  })
  education: {
    institution_name: string;
    course: string;
    degree: EducationLevel;
    start_date: Date;
    end_date?: Date | undefined;
    location: {
      city: string;
      state: string;
    };
  }[];

  @Column({
    type: "simple-json",
  })
  address: { street: string; city: string; state: string; zip_code: string };

  @Column({
    nullable: true,
  })
  github_url?: string;

  @Column({
    nullable: true,
  })
  linkedin_url?: string;

  @Column({
    nullable: true,
  })
  portfolio_url?: string;

  @Column({
    type: "simple-array",
  })
  certifications: string[];
}
