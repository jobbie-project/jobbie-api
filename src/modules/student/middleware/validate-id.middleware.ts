import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { StudentQueryService } from "../service/student-query.service";
@Injectable()
export class ValidateIdMiddleware implements NestMiddleware {
  constructor(private studentQueryService: StudentQueryService) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const requestedId = req.params.id;
      const student = this.studentQueryService.findOne({ key: "id", value: requestedId });
      if (!student) {
        return new NotFoundException("Usuário não encontrado");
      }
      next();
    } catch (e) {
      return new BadRequestException("Id inválido");
    }
  }
}
