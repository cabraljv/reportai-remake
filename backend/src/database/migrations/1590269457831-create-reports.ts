import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const table = new Table({
  name: 'reports',
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
      name: 'img_path',
      type: 'varchar',
      isNullable: false,
    },
    {
      name: 'category_id',
      type: 'int',
      isNullable: false,
    },
    {
      name: 'city_id',
      type: 'int',
      isNullable: false,
    },
    {
      name: 'user_id',
      type: 'int',
      isNullable: false,
    },
    {
      name: 'latitude',
      type: 'float',
      isNullable: false,
    },
    {
      name: 'longitude',
      type: 'float',
      isNullable: false,
    },
    {
      name: 'deleted_by',
      type: 'int',
      isNullable: true,
    },
    {
      name: 'deleted_at',
      type: 'timestamptz',
      isNullable: true,
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

export class createReports1590269457831 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);
    await queryRunner.createForeignKey(
      'reports',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedTableName: 'report_categories',
        onDelete: 'CASCADE',
        referencedColumnNames: ['id'],
      })
    );
    await queryRunner.createForeignKey(
      'reports',
      new TableForeignKey({
        columnNames: ['city_id'],
        referencedTableName: 'supported_cities',
        onDelete: 'CASCADE',
        referencedColumnNames: ['id'],
      })
    );
    await queryRunner.createForeignKey(
      'reports',
      new TableForeignKey({
        columnNames: ['deleted_by'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        referencedColumnNames: ['id'],
      })
    );
    await queryRunner.createForeignKey(
      'reports',
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
