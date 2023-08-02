import ApiError from "@/common/error";
import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import { validateFatecEmail } from "./";
import { CreateUserDto } from "@/modules/user/dtos/create-user.dto";
import { UserRole } from "@/modules/user/enums";

export function IsFatecEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "IsFatecEmail",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const context = validationOptions?.context;
          const user = args.object as CreateUserDto;
          if (!validateFatecEmail(value) && (user.role ? user.role === UserRole.STUDENT : true)) {
            throw new ApiError(context?.message ?? `invalid-${propertyName}`, context?.userMessage ?? "email inválido", 400);
          } else {
            return true;
          }
        },
      },
    });
  };
}
