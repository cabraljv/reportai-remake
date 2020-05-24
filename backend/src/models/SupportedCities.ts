import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Report from './Report';
import User from './User';

@Entity({ name: 'supported_cities' })
class SupportedCities {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name!: string;

  @Column()
  public city_code!: string;

  @Column()
  public createdAt!: Date;

  @Column()
  public updatedAt!: Date;

  @OneToMany(() => Report, (report) => report.user)
  reports!: Report[];

  @OneToMany(() => User, (user) => user.city_analyser)
  analysers!: User[];
}

export default SupportedCities;
