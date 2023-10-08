import { generate } from "rand-token";
import { JobRepository } from "../repositories/job.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JobHelper {
  constructor(private readonly jobRepository: JobRepository) {}

  async generateNewCode() {
    const code = generate(6, "123456789ABCDEFGHIJKLMNOPQRSTWVUXYZ");
    const alreadyExists = await this.findCode(code);
    if (alreadyExists) {
      return this.generateNewCode();
    }
    return code;
  }

  async findCode(code: string): Promise<boolean> {
    const codeAlreadyUsed = await this.jobRepository.findByCode(code);

    return !!codeAlreadyUsed;
  }
}
