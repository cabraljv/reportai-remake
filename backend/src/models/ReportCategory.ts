import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Report from './Report';

@Entity({ name: 'report_categories' })
class ReportCategory {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name!: string;

  @Column()
  public icon_path!: string;

  @Column()
  public created_at!: Date;

  @Column()
  public updated_at!: Date;

  @OneToMany(() => Report, (report) => report.user)
  reports!: Report[];
}

export default ReportCategory;
