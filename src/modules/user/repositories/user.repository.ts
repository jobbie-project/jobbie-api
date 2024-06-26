import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@/modules/user/user.entity";
import { FindOneUserOptions } from "../interfaces/find-one-user-options.interface";
import * as bcrypt from "bcrypt";
import { CreateUserPayload } from "../interfaces/create-user.payload";
import { UpdateUserPayload } from "../interfaces/update-user.payload";
@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(user: CreateUserPayload): Promise<User> {
    const newUser = await this.userRepository.save({
      ...user,
      password_hash: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
    });
    return newUser;
  }

  async findOne(options: FindOneUserOptions) {
    const qb = this.userRepository.createQueryBuilder("user");
    if (options.withPasswordHash) qb.addSelect("user.password_hash");
    if (options.relations) {
      options.relations.forEach((relation) => {
        qb.leftJoinAndSelect(`user.${relation}`, relation);
      });
    }
    if (options.withStudentAndCurriculum) {
      qb.leftJoinAndSelect("user.student", "student");
      qb.leftJoinAndSelect("student.curriculum", "curriculum");
      qb.leftJoinAndSelect("curriculum.fatec_institution", "fatec_institution");
      qb.leftJoinAndSelect("curriculum.fatec_course", "fatec_course");
    }
    qb.where(`user.${options.key} = :value`, { value: options.value });
    const user = await qb.getOne();
    return user;
  }

  async update(id: string, payload: UpdateUserPayload) {
    const user = await this.userRepository.findOne({ where: { id } });
    Object.assign(user, payload);
    return await this.userRepository.save(user);
  }

  async updatePassword(id: string, passwordHash: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    user.password_hash = passwordHash;
    return await this.userRepository.save(user);
  }

  async delete(id: string) {
    const deletedUser = await this.userRepository.delete(id);
    return { ok: true };
  }
}
