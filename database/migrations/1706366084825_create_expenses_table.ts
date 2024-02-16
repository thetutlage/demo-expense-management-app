import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'expenses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('category_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.integer('amount').notNullable()
      table.date('transaction_date').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
