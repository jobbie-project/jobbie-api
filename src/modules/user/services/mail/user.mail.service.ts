import { User } from "@/modules/user/user.entity";
import SendGrid from "@/common/mail";
import ApiError from "@/common/error";
export class UserMailService {
  async sendVerificationEmail(user: User, token: string) {
    const link = `${
      process.env.FRONTEND_URL ?? "localhost:5173"
    }/email-verificado?token=${token}`;
    try {
      const msg = {
        to: user.email,
        from: `Suporte Jobbie <suportejobbie@gmail.com>`,
        subject: "Confirmar conta",
        templateId: process.env.SENDGRID_CONFIRMATION_CODE_EMAIL_TEMPLATE_ID,
        dynamicTemplateData: {
          link: link,
          username: user.name,
        },
      };
      await SendGrid.send(msg);
    } catch (error) {
      throw new ApiError(
        "sendgrid-error",
        "Erro ao enviar email para confirmar conta",
        500,
        true
      );
    }
  }
}
