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
    try {
      const attachment: AttachmentSendgrid = this.generateStudentResumeService.generateResume(job.code, requestingUser);
      const msg: MailDataRequired = {
        to: job.owner_email,
        from: "Jobbie <suportejobbie@gmail.com>",
        subject: "Candidato para a sua vaga na Jobbie!",
        templateId: process.env.SENDGRID_SEND_APPLICATION_TO_JOB_EMAIL_TEMPLATE_ID,
        dynamicTemplateData: {
          subject: "Candidato para a sua vaga na Jobbie!",
          job_name: job.position,
          student_name: requestingUser.name,
        },
        attachments: [attachment],
      };
      await SendGrid.send(msg);
    } catch (error) {
      console.log(error.response.body.errors);
    }
  }

  async sendAllJobApplicantsToOwnerEmail(job: Job, requestingUsers: User[]) {
    try {
      const attachments: AttachmentSendgrid[] = [];

      requestingUsers.forEach((user) => {
        const attachment: AttachmentSendgrid = this.generateStudentResumeService.generateResume(job.code, user);
        attachments.push(attachment);
      });
      const msg: MailDataRequired = {
        to: job.owner_email,
        from: "Jobbie <suportejobbie@gmail.com>",
        subject: "Candidatos para a sua vaga na Jobbie!",
        templateId: process.env.SENDGRID_SEND_APPLICANT_EMAIL_TEMPLATE_ID,
        dynamicTemplateData: { job_name: job.position, subject: "Candidatos para a sua vaga na Jobbie!" },
        attachments: attachments,
      };
      await SendGrid.send(msg);
    } catch (error) {
      console.log(error.response.body.errors);
    }
  }
}
