import { MigrationInterface, QueryRunner } from "typeorm";

export class generateTables1699203459896 implements MigrationInterface {
  name = "generateTables1699203459896";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tech_stacks" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_ed42032091d26293136b63a01db" UNIQUE ("name"), CONSTRAINT "PK_cf2ca6c1a1fa1d111cb6f983a69" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "fatec_institutions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5a49e83ccf6f1fb753a11f3f894" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`
    INSERT INTO fatec_institutions (id, name)
    VALUES
      (1, 'Fatec Ribeirão Preto');
  `);
    await queryRunner.query(
      `CREATE TABLE "jobs_applicants" ("id" SERIAL NOT NULL, "was_sended" boolean NOT NULL DEFAULT false, "student_id" integer NOT NULL, "job_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_c383ca15facd687e6f8073b1d49" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE TYPE "public"."jobs_status_enum" AS ENUM('open', 'inactive', 'closed')`);
    await queryRunner.query(`CREATE TYPE "public"."jobs_type_enum" AS ENUM('face_to_face', 'remote', 'hybrid')`);
    await queryRunner.query(`CREATE TYPE "public"."jobs_contract_type_enum" AS ENUM('CLT', 'PJ', 'internship', 'trainee', 'temporary', 'free_lancer')`);
    await queryRunner.query(`CREATE TYPE "public"."jobs_job_time_enum" AS ENUM('full_time', 'part_time', 'to_match')`);
    await queryRunner.query(
      `CREATE TABLE "jobs" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "position" character varying NOT NULL, "salary" double precision NOT NULL, "owner_name" character varying, "company_name" character varying NOT NULL, "owner_email" character varying NOT NULL, "status" "public"."jobs_status_enum" NOT NULL DEFAULT 'open', "location" text, "num_positions" character varying, "type" "public"."jobs_type_enum" NOT NULL, "contract_type" "public"."jobs_contract_type_enum" NOT NULL, "job_time" "public"."jobs_job_time_enum" NOT NULL, "fatec_course_id" integer NOT NULL, "has_sorting" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "owner_company_id" integer, "owner_admin_id" integer, CONSTRAINT "UQ_b5b5a0e60fb45722d25babee955" UNIQUE ("code"), CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "fatec_courses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "abbreviation" character varying NOT NULL DEFAULT 'NONE', CONSTRAINT "PK_fd35a9ef93a1f6d5439da05a76b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `
        INSERT INTO fatec_courses (id, name, abbreviation) VALUES
        (1, 'Análise e Desenvolvimento de Sistemas', 'ADS'),
        (2, 'Gestão de Negócios e Inovação', 'GNI'),
        (3, 'Sistemas Biomédicos', 'SBM'),
        (4, 'Recursos Humanos', 'RH');
        `
    );
    await queryRunner.query(
      `CREATE TABLE "curriculums" ("id" SERIAL NOT NULL, "previous_experience" text NOT NULL, "fatec_cycle" integer NOT NULL, "fatec_start_date" TIMESTAMP NOT NULL, "education" text NOT NULL, "address" text NOT NULL, "github_url" character varying, "linkedin_url" character varying, "portfolio_url" character varying, "certifications" text NOT NULL, "fatec_institution_id" integer, "fatec_course_id" integer, CONSTRAINT "PK_091de2c9968cf577f7bc933cee9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE TYPE "public"."students_shift_enum" AS ENUM('MORNING', 'NIGHT')`);
    await queryRunner.query(
      `CREATE TABLE "students" ("id" SERIAL NOT NULL, "phone" character varying, "birth_date" TIMESTAMP, "shift" "public"."students_shift_enum" NOT NULL, "curriculum_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, CONSTRAINT "REL_fb3eff90b11bddf7285f9b4e28" UNIQUE ("user_id"), CONSTRAINT "REL_239ff054f34058572fe02d52ea" UNIQUE ("curriculum_id"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'company', 'student')`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "email_confirmation_token" character varying, "email_validated" boolean NOT NULL DEFAULT false, "profile_completed" boolean NOT NULL DEFAULT false, "role" "public"."users_role_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "student_id" integer, "company_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_4bcc4fd204f448ad671c0747ab" UNIQUE ("student_id"), CONSTRAINT "REL_7ae6334059289559722437bcc1" UNIQUE ("company_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE TYPE "public"."companies_size_enum" AS ENUM()`);
    await queryRunner.query(
      `CREATE TABLE "companies" ("id" SERIAL NOT NULL, "logo_url" character varying, "website_url" character varying, "description" character varying, "phone" character varying, "size" "public"."companies_size_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "curriculums_tech_stacks" ("tech_stack_id" integer NOT NULL, "curriculum_id" integer NOT NULL, CONSTRAINT "PK_ff364f0b3368d3513bd681b3acb" PRIMARY KEY ("tech_stack_id", "curriculum_id"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_936a38b96e48a4e2f5b29ddd21" ON "curriculums_tech_stacks" ("tech_stack_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_d189994bcfdeaac3beb6c9a824" ON "curriculums_tech_stacks" ("curriculum_id") `);
    await queryRunner.query(
      `ALTER TABLE "jobs_applicants" ADD CONSTRAINT "FK_99932f8d629d007f60248c96ee7" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs_applicants" ADD CONSTRAINT "FK_111d1c6c27657f15455665dd5ee" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "FK_fc31301054360297ba104487197" FOREIGN KEY ("fatec_course_id") REFERENCES "fatec_courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "FK_a1fd8867df07cca94f0e8f8e856" FOREIGN KEY ("owner_company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "FK_2feaf8cdf64e152e6290ce7648d" FOREIGN KEY ("owner_admin_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "curriculums" ADD CONSTRAINT "FK_ab2e231000f04f6aa2754ae9da4" FOREIGN KEY ("fatec_institution_id") REFERENCES "fatec_institutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "curriculums" ADD CONSTRAINT "FK_80d9f6afff615ea247565433777" FOREIGN KEY ("fatec_course_id") REFERENCES "fatec_courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_239ff054f34058572fe02d52ea8" FOREIGN KEY ("curriculum_id") REFERENCES "curriculums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_4bcc4fd204f448ad671c0747ab4" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_7ae6334059289559722437bcc1c" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "curriculums_tech_stacks" ADD CONSTRAINT "FK_936a38b96e48a4e2f5b29ddd210" FOREIGN KEY ("tech_stack_id") REFERENCES "tech_stacks"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "curriculums_tech_stacks" ADD CONSTRAINT "FK_d189994bcfdeaac3beb6c9a824f" FOREIGN KEY ("curriculum_id") REFERENCES "curriculums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "curriculums_tech_stacks" DROP CONSTRAINT "FK_d189994bcfdeaac3beb6c9a824f"`);
    await queryRunner.query(`ALTER TABLE "curriculums_tech_stacks" DROP CONSTRAINT "FK_936a38b96e48a4e2f5b29ddd210"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7ae6334059289559722437bcc1c"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_4bcc4fd204f448ad671c0747ab4"`);
    await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_239ff054f34058572fe02d52ea8"`);
    await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281"`);
    await queryRunner.query(`ALTER TABLE "curriculums" DROP CONSTRAINT "FK_80d9f6afff615ea247565433777"`);
    await queryRunner.query(`ALTER TABLE "curriculums" DROP CONSTRAINT "FK_ab2e231000f04f6aa2754ae9da4"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_2feaf8cdf64e152e6290ce7648d"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_a1fd8867df07cca94f0e8f8e856"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_fc31301054360297ba104487197"`);
    await queryRunner.query(`ALTER TABLE "jobs_applicants" DROP CONSTRAINT "FK_111d1c6c27657f15455665dd5ee"`);
    await queryRunner.query(`ALTER TABLE "jobs_applicants" DROP CONSTRAINT "FK_99932f8d629d007f60248c96ee7"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d189994bcfdeaac3beb6c9a824"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_936a38b96e48a4e2f5b29ddd21"`);
    await queryRunner.query(`DROP TABLE "curriculums_tech_stacks"`);
    await queryRunner.query(`DROP TABLE "companies"`);
    await queryRunner.query(`DROP TYPE "public"."companies_size_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "students"`);
    await queryRunner.query(`DROP TYPE "public"."students_shift_enum"`);
    await queryRunner.query(`DROP TABLE "curriculums"`);
    await queryRunner.query(`DROP TABLE "fatec_courses"`);
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(`DROP TYPE "public"."jobs_job_time_enum"`);
    await queryRunner.query(`DROP TYPE "public"."jobs_contract_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."jobs_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."jobs_status_enum"`);
    await queryRunner.query(`DROP TABLE "jobs_applicants"`);
    await queryRunner.query(`DROP TABLE "fatec_institutions"`);
    await queryRunner.query(`DROP TABLE "tech_stacks"`);
  }
}
