import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import User from './User';
import SupportedCity from './SupportedCities';
import ReportCategory from './ReportCategory';
import ReportStatus from './ReportStatus';

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
  public deleted_at!: Date;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: 'deleted_by' })
  public deleted_by!: User | number;

  @OneToMany(() => ReportStatus, (status) => status.report)
  public status!: ReportStatus[];

  @Column()
  public created_at!: Date;

  @Column()
  public updated_at!: Date;
}

export default Report;
