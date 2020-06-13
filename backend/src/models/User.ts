import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import Report from './Report';
import City from './SupportedCities';

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

  @Column()
  public password!: string;

  @Column()
  public isConfirmed!: number;

  @Column({ default: 'now()' })
  @CreateDateColumn()
  public createdAt!: Date;

  @ManyToOne(() => City, (city) => city.analysers)
  @JoinColumn({ name: 'city_analyser' })
  city_analyser!: City;

  @Column({ default: 'now()' })
  @CreateDateColumn()
  public updatedAt!: Date;

  @OneToMany(() => Report, (report) => report.user)
  reports!: Report[];

  async verifyPassword(pass: string): Promise<boolean> {
    return await bcrypt.compare(pass, this.password);
  }
}

export default User;
