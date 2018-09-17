
exports.up = (knex, Promise) => {
  return knex.schema.createTable('subscriptions', (table) => {
    table.increments()
    table.integer('user_id').unsigned().index().references('users.id')
    table.integer('entry_id').unsigned().index().references('entries.id')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('subscriptions')
}
