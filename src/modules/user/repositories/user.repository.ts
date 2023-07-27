import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "@/modules/user/user.entity";
import { FindOneUserOptions } from "../interfaces/find-one-user-options.interface";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from "bcrypt";
@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.save({
      ...user,
      password_hash: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
    });
    return newUser;
  }

  async findOne(options: FindOneUserOptions) {
    const qb = this.userRepository.createQueryBuilder("user");
    if (options.relations) {
      options.relations.forEach((relation) => {
        qb.leftJoinAndSelect(`user.${relation}`, relation);
      });
    }
    qb.where(`user.${options.key} = :value`, { value: options.value });
    const user = await qb.getOne();
    return user;
  }

  async update(id: string, user: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(id, user);
    return updatedUser;
  }

  async delete(id: string) {
    const deletedUser = await this.userRepository.delete(id);
    return { ok: true };
  }
}
