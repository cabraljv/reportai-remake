import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const table = new Table({
  name: 'report_categories',
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
      name: 'name',
      type: 'varchar',
      isNullable: false,
    },
    {
      name: 'icon_path',
      type: 'varchar',
      isNullable: false,
    },
    {
      name: 'created_at',
      type: 'timestamptz',
      default: 'now()',
    },
    {
      name: 'updated_at',
      type: 'timestamptz',
      default: 'now()',
    },
  ],
});

export class createCategory1590269439185 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table, true);
  }
}
