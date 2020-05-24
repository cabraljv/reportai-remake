import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';
import SupportedCity from './SupportedCities';
import ReportCategory from './ReportCategory';

@Entity({ name: 'reports' })
class Report {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public description!: string;

  @Column()
  public img_path!: string;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: 'user_id' })
  public user!: User | number;

  @ManyToOne(() => SupportedCity, (city) => city.reports)
  @JoinColumn({ name: 'city_id' })
  public city!: SupportedCity | number;

  @ManyToOne(() => ReportCategory, (category) => category.reports)
  @JoinColumn({ name: 'category_id' })
  public category!: ReportCategory | number;

  @Column()
  public latitude!: number;

  @Column()
  public longitude!: number;

  @Column()
  public deletedAt!: Date;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: 'deletedBy' })
  public deletedBy!: User | number;

  @Column()
  public createdAt!: Date;

  @Column()
  public updatedAt!: Date;
}

export default Report;
