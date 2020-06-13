import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const table = new Table({
  name: 'report_status',
  columns: [
    {
      name: 'id',
      type: 'int',
      isGenerated: true,
      generationStrategy: 'increment',
      isNullable: false,
      isPrimary: true,
    },
    {
      name: 'description',
      type: 'varchar',
      isNullable: false,
    },
    {
      name: 'user_id',
      type: 'int',
      isNullable: false,
    },
    {
      name: 'report_id',
      type: 'int',
      isNullable: false,
    },
    {
      name: 'createdAt',
      type: 'timestamptz',
      default: 'now()',
    },
    {
      name: 'updatedAt',
      type: 'timestamptz',
      default: 'now()',
    },
  ],
});

export class createReportStatus1592087413921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);
    await queryRunner.createForeignKey(
      'report_status',
      new TableForeignKey({
        columnNames: ['report_id'],
        referencedTableName: 'reports',
        onDelete: 'CASCADE',
        referencedColumnNames: ['id'],
      })
    );
    await queryRunner.createForeignKey(
      'report_status',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        referencedColumnNames: ['id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table, true);
  }
}
