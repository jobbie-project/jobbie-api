import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserQueryService } from "../service/user-query.service";
@Injectable()
export class ValidateIdMiddleware implements NestMiddleware {
  constructor(private userQueryService: UserQueryService) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const requestedId = req.params.id;
      const user = this.userQueryService.findOne({ key: "id", value: requestedId });
      if (!user) {
        return new NotFoundException("Usuário não encontrado");
      }
      next();
    } catch (e) {
      return new BadRequestException("Id inválido");
    }
  }
}
