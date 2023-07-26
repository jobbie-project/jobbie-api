import { Response } from "express";

class ApiError extends Error {
  userMessage: string;
  statusCode: number;
  isStudentError?: boolean;
  response?: object;
  typeError?: "string" | "html";

  constructor(message: string, userMessage: string, statusCode: number, isStudentError?: boolean, typeError?: "string" | "html") {
    super(message);
    this.userMessage = userMessage;
    this.statusCode = statusCode;
    this.isStudentError = isStudentError;
    this.typeError = typeError;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export function handleError(err: Error | ApiError, res?: Response) {
  if (err instanceof ApiError) {
    if (!err.isStudentError) {
      console.error({ err: err, stack: err.stack, customMessage: err.userMessage });
    }

    if (res) {
      if (err.userMessage) {
        return res.status(err.statusCode ?? 500).send({
          ok: false,
          message: err.message,
          userMessage: err.userMessage,
          typeError: err.typeError ?? "string",
        });
      } else if (err.message) {
        return res.status(err.statusCode ?? 500).send({ ok: false, message: err.message });
      } else {
        return res.status(err.statusCode ?? 500).send({ ok: false, message: "unknown-error", userMessage: "Erro desconhecido" });
      }
    } else {
      if (err.message) {
        return res.status(500).send({ ok: false, message: err.message });
      } else {
        return res.status(500).send({ ok: false, message: "unknown-error", userMessage: "Erro desconhecido" });
      }
    }
  } else {
    console.error({ err: err, stack: err.stack, customMessage: `non-api-error` });
    if (res) {
      if (err.message) {
        return res.status(500).send({ ok: false, message: err.message });
      } else {
        return res.status(500).send({ ok: false, message: "unknown-error", userMessage: "Erro desconhecido" });
      }
    }
  }
}

export default ApiError;
