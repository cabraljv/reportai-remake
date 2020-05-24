import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const table = new Table({
  name: 'users',
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
      name: 'email',
      type: 'varchar',
      isNullable: false,
    },
    {
      name: 'password_hash',
      type: 'varchar',
      isNullable: false,
    },
    {
      name: 'cpf',
      type: 'varchar',
      isNullable: false,
    },
    {
      name: 'isConfirmed',
      type: 'boolean',
      default: false,
    },
    {
      name: 'city_analyser',
      type: 'int',
      isNullable: true,
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

export class createUser1590269449352 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['city_analyser'],
        referencedTableName: 'supported_cities',
        onDelete: 'CASCADE',
        referencedColumnNames: ['id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table, true);
  }
}
