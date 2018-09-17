
exports.up = (knex, Promise) => {
  return knex.schema.createTable('reads', (table) => {
    table.increments()
    table.integer('user_id')
    table.integer('entry_id')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('reads')
}
