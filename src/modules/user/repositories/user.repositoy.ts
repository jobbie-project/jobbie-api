import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateUserDto } from "../dto/update-user.dto";
import User from "../user.model";
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(user: User) {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.createQueryBuilder("user").where("user.email = :email", { email: email }).addSelect("user.password_hash").getOne();

    return user;
  }

  async update(id: number, user: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(id, user);
    return updatedUser;
  }

  async delete(id: number) {
    const deletedUser = await this.userRepository.delete(id);
    return { ok: true };
  }
}
