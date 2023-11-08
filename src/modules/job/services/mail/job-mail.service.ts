import { Injectable } from "@nestjs/common";
import { Job } from "../../job.entity";
import { User } from "@/modules/user/user.entity";
import { GenerateStudentResumeService } from "@/common/services/generateResume.service";
import { MailDataRequired } from "@sendgrid/mail";
import SendGrid from "@/common/mail";
export interface AttachmentSendgrid {
  content: string;
  filename: string;
  type: string;
  disposition: string;
}
@Injectable()
export class JobMailService {
  constructor(private readonly generateStudentResumeService: GenerateStudentResumeService) {}

  async sendJobApplicationToOwnerEmail(job: Job, requestingUser: User) {
    const attachment: AttachmentSendgrid = await this.generateStudentResumeService.generateResume(job?.code ?? "XPTO01", requestingUser);

    const msg: MailDataRequired = {
      to: job.owner_email,
      from: "Jobbie <suportejobbie@gmail.com>",
      subject: "Candidato para a sua vaga na Jobbie!",
      templateId: process.env.SENDGRID_SEND_APPLICANT_EMAIL_TEMPLATE_ID,
      dynamicTemplateData: {},
      attachments: [attachment],
    };
    await SendGrid.send(msg);
  }

  async sendAllJobApplicantsToOwnerEmail(job: Job, requestingUsers: User[]) {
    let attachments: AttachmentSendgrid[];
    requestingUsers.forEach(async (user) => {
      this.generateStudentResumeService.generateResume(job?.code ?? "XPTO01", user).then((value) => {
        attachments.push(value);
      });
    });

    const msg: MailDataRequired = {
      to: job.owner_email,
      from: "Jobbie <suportejobbie@gmail.com>",
      subject: "Candidatos para a sua vaga na Jobbie!",
      templateId: process.env.SENDGRID_SEND_APPLICANT_EMAIL_TEMPLATE_ID,
      dynamicTemplateData: {},
      attachments: attachments,
    };
    await SendGrid.send(msg);
  }
}
