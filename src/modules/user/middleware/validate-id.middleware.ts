import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user.service";

@Injectable()
export class ValidateIdMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const requestedId = +req.params.id;
      const user = this.userService.findOneById(requestedId);
      if (!user) {
        return new NotFoundException("Usuário não encontrado");
      }
      next();
    } catch (e) {
      return new BadRequestException("Id inválido");
    }
  }
}
