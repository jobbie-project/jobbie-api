import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcrypt";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ select: false })
  password_hash: string;

  @Column({ nullable: true })
  email_confirmation_code: string;

  verifyPassword(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password_hash);
  }
}
