import { Controller, Get } from "@nestjs/common";
import { FatecService } from "../services/fatec.service";

@Controller("fatec")
export class FatecController {
  constructor(private readonly fatecService: FatecService) {}
  @Get("institutions")
  async getInstitutions() {
    return await this.fatecService.getInstitutions();
  }
  @Get("courses")
  async getCourses() {
    return await this.fatecService.getCourses();
  }
}
