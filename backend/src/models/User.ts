import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';

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

  @Column()
  public createdAt!: Date;

  @Column()
  public updatedAt!: Date;

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
