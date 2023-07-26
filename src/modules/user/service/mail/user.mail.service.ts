import { User } from "@/modules/user/user.entity";
import { UserHelper } from "@/modules/user/helpers/user.helper";
import SendGrid from "@/common/mail";
export class UserMailService {
  constructor(private userHelper: UserHelper) {}
  async sendVerificationEmail(user: User) {
    try {
      const token = await this.userHelper.generateEmailConfirmationToken(user.id);
      const msg = {
        to: user.email,
        from: `Suporte <suporte@emepag.com.br>`,
        templateId: process.env.SENDGRID_CONFIRMATION_CODE_EMAIL_TEMPLATE_ID,
        dynamicTemplateData: {
          token: token,
          name: user.name,
        },
      };
      await SendGrid.send(msg);
    } catch (error) {
      console.log(error, "SendgridAccountMailService");
    }
  }
}
