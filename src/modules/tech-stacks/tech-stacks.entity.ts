import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("tech_stacks")
export class TechStack {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  is_active: boolean;

  // @ManyToMany(() => Curriculum, (curriculum) => curriculum.tech_stacks)
  // students: Curriculum[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_At: Date;
}
