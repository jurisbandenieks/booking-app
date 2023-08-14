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
    companyId: {
      type: "integer",
      notNull: true,
      references: '"companies"',
      onDelete: "cascade"
    },
    paymentMethodId: {
      type: "integer",
      notNull: true,
      references: '"payment_methods"',
      onDelete: "cascade"
    }
  });
};

exports.down = (pgm) => {};
