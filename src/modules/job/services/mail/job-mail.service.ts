import { Injectable } from "@nestjs/common";
import { Job } from "../../job.entity";
import { User } from "@/modules/user/user.entity";

@Injectable()
export class JobMailService {
  async sendJobApplicationToOwnerEmail(job: Job, requestingUser: User) {
    console.log("email do usuário: ", requestingUser.email, " email do responsável da vaga: ", job.owner_email, " foi enviado");
  }

  async sendAllJobApplicantsToOwnerEmail(job: Job, requestingUsers: User[]) {}
}
