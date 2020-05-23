import { MigrationInterface, QueryRunner, Table } from 'typeorm';

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

export class createUser1590220048305 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table);
  }
}
