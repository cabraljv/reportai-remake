import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';
import Report from './Report';

@Entity({ name: 'reports' })
class ReportStatus {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public description!: string;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: 'user_id' })
  public user!: User | number;

  @ManyToOne(() => Report, (report) => report.status)
  @JoinColumn({ name: 'report_id' })
  public report!: Report | number;

  @Column()
  public latitude!: number;

  @Column()
  public createdAt!: Date;

  @Column()
  public updatedAt!: Date;
}

export default ReportStatus;
