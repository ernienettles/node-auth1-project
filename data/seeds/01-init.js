exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const roles = [
    {
      name: "admin",
    },
    {
      name: "user", 
    },
  ];

  return knex("roles")
    .insert(roles)
    .then(() => console.log("\n== Seed data for roles table added. ==\n"));
};
