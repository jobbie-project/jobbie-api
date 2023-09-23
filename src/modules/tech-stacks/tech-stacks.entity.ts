import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Curriculum } from "../curriculum/curriculum.entity";

@Entity("tech_stacks")
export class TechStack {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    default: true,
  })
  is_active: boolean;

  @ManyToMany(() => Curriculum, (curriculum) => curriculum.tech_stacks)
  @JoinTable({
    name: "curriculums_tech_stacks",
    joinColumns: [{ name: "tech_stack_id" }],
    inverseJoinColumns: [{ name: "curriculum_id" }],
  })
  curriculums: Curriculum[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
