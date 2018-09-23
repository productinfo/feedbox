
exports.up = (knex, Promise) => {
  return knex.schema.createTable('feeds_users', (table) => {
    table.increments()
    table.integer('user_id').unsigned().index().references('users.id')
    table.integer('feed_id').unsigned().index().references('feeds.id')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('feeds_users')
}
