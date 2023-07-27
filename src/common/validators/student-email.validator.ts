import ApiError from "@/common/error";
import { registerDecorator, ValidationOptions } from "class-validator";
import { validateFatecEmail } from "./";

export function isFatecEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isFatecEmail",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const context = validationOptions?.context;
          if (!validateFatecEmail(value)) {
            throw new ApiError(context?.message ?? `invalid-${propertyName}`, context?.userMessage ?? "email inválido", 400);
          } else {
            return true;
          }
        },
      },
    });
  };
}
