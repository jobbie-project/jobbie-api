export interface FindOneUserOptions {
  key: "id" | "email" | "email_confirmation_code";
  value: string;
  relations?: string[];
}
