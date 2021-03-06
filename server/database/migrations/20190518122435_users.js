exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", table => {
      table.increments().primary();
      table
        .string("username")
        .unique()
        .notNullable();
      table
        .string("email")
        .unique()
        .notNullable();
      table.string("password").notNullable();
      table.string("stripe_id");
      table.string("profileblurb");
      table.string("avatarurl");
      table.string("stripe_signup");
      table.string("resetPasswordToken");
      table.string("resetPasswordExpires");
      table.timestamp("created_at").defaultTo(knex.raw("now()"));
      table.timestamp("updated_at");
    })
    .then(function() {
      return knex.schema
        .createTable("comments", table => {
          table.increments("id").primary();
          table.string("text").notNullable();
          table.timestamp("created_at").defaultTo(knex.raw("now()"));
          table.timestamp("updated_at");
          table.integer("user_id").unsigned();
          table.integer("product_id");
          table.foreign("user_id").references("users.id");
          table.string("username").unsigned();
          table
            .foreign("username")
            .references("users.username")
            .onDelete("cascade");
        })
        .then(function() {
          return knex.schema.createTable("messages", table => {
            table.increments("message_id").primary();
            table.string("subject");
            table.string("text");
            table.integer("sent_to");
            table.timestamp("created_at");
            table.timestamp("updated_at");
            table.integer("user_id").unsigned();
            table
              .foreign("user_id")
              .references("users.id")
              .onDelete("cascade");
          });
        });
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("messages")
    .dropTable("comments")
    .dropTable("users");
};
