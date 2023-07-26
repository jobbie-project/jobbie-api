import { Response } from "express";

class ApiError extends Error {
  userMessage: string;
  statusCode: number;
  isUserError?: boolean;
  response?: object;
  typeError?: "string" | "html";

  constructor(message: string, userMessage: string, statusCode: number, isUserError?: boolean, typeError?: "string" | "html") {
    super(message);
    this.userMessage = userMessage;
    this.statusCode = statusCode;
    this.isUserError = isUserError;
    this.typeError = typeError;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export function handleError(err: Error | ApiError, res?: Response) {
  if (err instanceof ApiError) {
    if (!err.isUserError) {
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
