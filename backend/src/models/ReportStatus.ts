import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';
import Report from './Report';

@Entity({ name: 'report_status' })
class ReportStatus {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public description!: string;

  @Column()
  public status_code!: number;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: 'user_id' })
  public user!: User | number;

  @ManyToOne(() => Report, (report) => report.status)
  @JoinColumn({ name: 'report_id' })
  public report!: Report | number;

  @Column()
  public created_at!: Date;

  @Column()
  public updated_at!: Date;
}

export default ReportStatus;
