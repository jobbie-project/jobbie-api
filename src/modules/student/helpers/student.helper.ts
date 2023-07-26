import ApiError from "@/common/error";
import { StudentRepository } from "../repositories/student.repositoy";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Student } from "../student.model";
export class StudentHelper {
  constructor(private userRepository: StudentRepository) {}

  async validateEmail(email: string) {
    const student = await this.userRepository.findOneByEmail(email);
    if (student) {
      throw new Error("Email already exists");
    }
  }

  generatePasswordHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  async generateEmailConfirmationToken(userEmail: string) {
    const token = jwt.sign({ email: userEmail }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return token;
  }

  async confirmEmail(token: string, userToConfirm: Student) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new ApiError("invalid-token", "Token inválido", 400, true);
    }
    const student = await this.userRepository.findOneByEmail(userToConfirm.email);
    if (!student) throw new ApiError("email-auth-expired-token", "Token não é o mais atual", 404, true);
    student.email_validated = true;
    await this.userRepository.update(student.id, student);
    return { token, email: student.email };
  }
}
