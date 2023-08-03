import { UserCreationService } from "@/modules/user/service/user-creation.service";
import { UserQueryService } from "@/modules/user/service/user-query.service";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Company } from "../company.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCompanyPayload } from "../interfaces/create-company.payload";

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    private userQueryService: UserQueryService,
    private userCreationService: UserCreationService
  ) {}

  async create(createCompanyPayload: CreateCompanyPayload): Promise<Company> {
    const newCompany = await this.companyRepository.save(createCompanyPayload);
    return newCompany;
  }
}
