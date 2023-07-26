import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  host: process.env.DB_HOST || "localhost",
  port: process.env.PORT || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DATABASE || "postgres",
  secret: process.env.JWT_SECRET || "my-new-secret",
}));
