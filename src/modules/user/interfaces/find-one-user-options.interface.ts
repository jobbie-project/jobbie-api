export interface FindOneUserOptions {
  key: "id" | "email" | "email_confirmation_token";
  value: string;
  withPasswordHash?: boolean;
  relations?: string[];
  withStudentAndCurriculum?: boolean;
}
