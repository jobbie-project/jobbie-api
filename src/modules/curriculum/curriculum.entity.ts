import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { EducationLevel, JobType } from "./enums";
import { TechStack } from "../tech-stacks/tech-stacks.entity";

@Entity("curriculums")
export class Curriculum {
  @PrimaryGeneratedColumn()
  id: string;

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
