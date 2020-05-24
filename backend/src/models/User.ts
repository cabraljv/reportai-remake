import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import Report from './Report';

@Entity({ name: 'users' })
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name!: string;

  @Column()
  public email!: string;

  @Column()
  public cpf!: string;

  public password!: string | null;

  @Column()
  public password_hash!: string;

  @Column({ default: 'now()' })
  public createdAt!: Date;

  @Column({ default: 'now()' })
  public updatedAt!: Date;

  @OneToMany(() => Report, (report) => report.user)
  reports!: Report[];

  @BeforeInsert()
  async encryptPassword() {
    this.password_hash = await bcrypt.hash(this.password || '', 8);
    this.password = null;
  }
  async verifyPassword(pass: string) {
    return await bcrypt.compare(pass, this.password_hash);
  }
}

export default User;
