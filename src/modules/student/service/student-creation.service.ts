import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdateStudentDto } from "../dto/update-student.dto";
import { StudentHelper } from "../helpers/student.helper";
import { StudentRepository } from "../repositories/student.repositoy";
import { Student } from "@/modules/student/student.model";

export class StudentCreationService {
  constructor(private userRepository: StudentRepository, private userHelper: StudentHelper) {}

  async create(userToCreate: CreateStudentDto) {
    const newStudent = new Student();
    newStudent.name = userToCreate.name;
    newStudent.email = userToCreate.email;
    newStudent.password_hash = this.userHelper.generatePasswordHash(userToCreate.password);

    return this.userRepository.create(newStudent);
  }

  async update(id: string, userToUpdate: UpdateStudentDto) {
    const student = await this.userRepository.findOne({ key: "id", value: id });
    userToUpdate = { ...student, ...userToUpdate };
    return this.userRepository.update(id, userToUpdate);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
