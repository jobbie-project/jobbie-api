import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FatecInstitution } from "../fatec-institution.entity";
import { Repository } from "typeorm";

@Injectable()
export class FatecInstitutionRepository {
  constructor(@InjectRepository(FatecInstitution) private readonly fatecInstitution: Repository<FatecInstitution>) {}
  async findAll() {
    return await this.fatecInstitution.find();
  }
}
