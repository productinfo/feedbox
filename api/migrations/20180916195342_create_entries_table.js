
exports.up = (knex, Promise) => {
  return knex.schema.createTable('entries', (table) => {
    table.increments()
    table.uuid('uuid')
    table.string('title')
    table.string('author').nullable()
    table.string('summary').nullable()
    table.string('site_url')
    table.string('article_url')
    table.string('favicon').nullable()
    table.string('image').nullable()
    table.string('published_date')
    table.integer('feed_id').unsigned().index().references('feeds.id').notNullable()
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('entries')
}
