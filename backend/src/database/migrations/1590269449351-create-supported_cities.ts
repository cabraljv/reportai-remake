import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const table = new Table({
  name: 'supported_cities',
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
      name: 'city_code',
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
export class createSupportedCities1590269449351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table, true);
  }
}
