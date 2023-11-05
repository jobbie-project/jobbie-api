import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const config = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  entities: ["./**/*.entity{.ts,.js}"],
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ["./src/migrations/*.ts"],
  synchronize: false,
  logging: false,
});

export default config;
