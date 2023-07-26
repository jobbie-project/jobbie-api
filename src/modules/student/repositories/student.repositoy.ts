import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateStudentDto } from "../dto/update-student.dto";
import { Student } from "@/modules/student/student.model";
import { FindOneStudentOptions } from "../interfaces/find-one-student-options.interface";
@Injectable()
export class StudentRepository {
  constructor(
    @InjectRepository(Student)
    private userRepository: Repository<Student>
  ) {}

  async create(student: Student) {
    const newStudent = await this.userRepository.save(student);
    return newStudent;
  }

  async findOne(options: FindOneStudentOptions) {
    const qb = this.userRepository.createQueryBuilder("student");
    if (options.relations) {
      options.relations.forEach((relation) => {
        qb.leftJoinAndSelect(`student.${relation}`, relation);
      });
    }
    qb.where(`student.${options.key} = :value`, { value: options.value });
    const student = await qb.getOne();
    return student;
  }

  async update(id: string, student: UpdateStudentDto) {
    const updatedStudent = await this.userRepository.update(id, student);
    return updatedStudent;
  }

  async delete(id: string) {
    const deletedStudent = await this.userRepository.delete(id);
    return { ok: true };
  }
}
