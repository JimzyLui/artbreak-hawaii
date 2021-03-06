exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("invoices")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("invoices").insert([
        {
          user_id: 2,
          description: "this one was gross",
          buyerEmail: "sams@sams.com",
          paid: true
        },
        {
          user_id: 2,
          description: "something illicit",
          price: 0.0,
          buyerEmail: "dynamiteandspider@hgmail.com",
          paid: true
        },
        {
          user_id: 2,
          description: "was this even legal?",
          price: 0.0,
          buyerEmail: "juntilla@hawaii.edu",
          paid: false
        }
      ]);
    });
};
