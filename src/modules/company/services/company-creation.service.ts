import { User } from "@/modules/user/user.entity";
import { Injectable } from "@nestjs/common";
import { CreateCompanyDto } from "../dtos/create-company.dto";
import { CompanyRepository } from "../repositories/company.repository";

@Injectable()
export class CompanyCreationService {
  constructor(private readonly companyRepository: CompanyRepository) {}
  async create(user: User, createCompanyDto: CreateCompanyDto) {
    const newCompany = await this.companyRepository.create({ ...createCompanyDto, user });
  }
}
