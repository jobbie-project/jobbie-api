import { Controller, Post } from "@nestjs/common";

@Controller("student")
export class StudentController {
  @Post()
  create() {
    return "This action adds a new student";
  }
}
