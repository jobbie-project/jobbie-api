import { Student } from "@/modules/student/student.model";
import { StudentHelper } from "@/modules/student/helpers/student.helper";
import SendGrid from "@/common/mail";
export class StudentMailService {
  constructor(private userHelper: StudentHelper) {}
  async sendVerificationEmail(student: Student) {
    try {
      const token = await this.userHelper.generateEmailConfirmationToken(student.id);
      const msg = {
        to: student.email,
        from: `Suporte <suporte@emepag.com.br>`,
        templateId: process.env.SENDGRID_CONFIRMATION_CODE_EMAIL_TEMPLATE_ID,
        dynamicTemplateData: {
          token: token,
          name: student.name,
        },
      };
      await SendGrid.send(msg);
    } catch (error) {
      console.log(error, "SendgridAccountMailService");
    }
  }
}
