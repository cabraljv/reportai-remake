import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Report from './Report';

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
}

export default SupportedCities;
