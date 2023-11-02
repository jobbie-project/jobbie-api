import ApiError from "@/common/error";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import { UserQueryService } from "./user-query.service";
import { UserHelper } from "../helpers/user.helper";
import { UserMailService } from "./mail/user.mail.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserValidationService {
  constructor(
    private readonly userRepository: UserRepository,
    private userQueryService: UserQueryService,
    private userHelper: UserHelper,
    private userMailService: UserMailService
  ) {}

  async verifyEmail(token: string) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new ApiError("invalid-token", "Token inválido", 400, true);
    }
    const user = await this.userQueryService.findOne({ key: "email_confirmation_token", value: token });
    if (!user) throw new ApiError("email-auth-expired-token", "Token não é o mais atual", 404, true);
    user.email_validated = true;
    this.userRepository.update(user.id, { email_validated: true });
    return { ok: true, token, email: user.email };
  }
  async resendConfirmationEmail(email: string) {
    const user = await this.userQueryService.findOne({ key: "email", value: email });
    if (!user) throw new ApiError("email-not-found", "Usuário não encontrado", 404, true);
    const token = await this.userHelper.generateEmailConfirmationToken(email);
    await this.userMailService.sendVerificationEmail(user.email, user.name, token);
    await this.userRepository.update(user.id, { email_confirmation_token: token });
    return token;
  }
}
