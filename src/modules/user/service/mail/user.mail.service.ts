import { User } from "@/modules/user/user.entity";
import SendGrid from "@/common/mail";
export class UserMailService {
  async sendVerificationEmail(user: User, token: string) {
    const link = `${process.env.FRONTEND_URL ?? "localhost"}/confirmar-email?token=${token}`;
    try {
      const msg = {
        to: user.email,
        from: `Suporte Jobbie <felipelipe.botelho@gmail.com>`,
        subject: "Confirme seu email",
        templateId: process.env.SENDGRID_CONFIRMATION_CODE_EMAIL_TEMPLATE_ID,
        dynamicTemplateData: {
          confirmation_link: link,
          username: user.name,
        },
      };
      await SendGrid.send(msg);
    } catch (error) {
      console.log(error, "SendgridAccountMailService");
    }
  }
}
