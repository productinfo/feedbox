
exports.up = (knex, Promise) => {
  return knex.schema.createTable('favourites', (table) => {
    table.increments()
    table.integer('user_id')
    table.integer('entry_id')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('favourites')
}
