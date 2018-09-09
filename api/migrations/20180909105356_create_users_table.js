
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('name')
    table.string('email').unique()
    table.string('password')
    table.string('passwordResetToken')
    table.string('passwordResetExpires')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
