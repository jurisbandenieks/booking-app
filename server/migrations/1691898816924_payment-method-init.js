/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("payment_methods", {
    id: "id",
    name: { type: "varchar(1000)", notNull: true },
    options: { type: "json" }
  });

  pgm.createTable("company_payment_methods", {
    id: "id",
    company_id: {
      type: "integer",
      notNull: true,
      references: '"companies"',
      onDelete: "cascade"
    },
    payment_method_id: {
      type: "integer",
      notNull: true,
      references: '"payment_methods"',
      onDelete: "cascade"
    }
  });
};

exports.down = (pgm) => {};
