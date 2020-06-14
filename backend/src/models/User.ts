import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
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
  public profile_pic!: string;

  @Column()
  public social_id!: string;

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
}

export default User;
