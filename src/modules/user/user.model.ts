import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';
@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ select: false })
  password_hash: string;

  verifyPassword(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password_hash);
  }
}

export default User;
