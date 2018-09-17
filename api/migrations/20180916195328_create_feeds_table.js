
exports.up = (knex, Promise) => {
  return knex.schema.createTable('feeds', (table) => {
    table.increments()
    table.string('title')
    table.string('feed_url')
    table.string('site_url')
    table.string('description')
    table.string('favicon')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('feeds')
}
