import { User } from "@/modules/user/user.entity";
import SendGrid from "@/common/mail";
import ApiError from "@/common/error";
export class UserMailService {
  async sendVerificationEmail(email: string, name: string, token: string) {
    const link = `${process.env.FRONTEND_URL ?? "localhost:5173"}/email-verificado?token=${token}`;
    try {
      const msg = {
        to: email,
        from: `Suporte Jobbie <suportejobbie@gmail.com>`,
        subject: "Confirmar conta",
        templateId: process.env.SENDGRID_CONFIRMATION_CODE_EMAIL_TEMPLATE_ID,
        dynamicTemplateData: {
          link: link,
          username: name,
        },
      };
      await SendGrid.send(msg);
    } catch (error) {
      return error;
    }
  }
}
