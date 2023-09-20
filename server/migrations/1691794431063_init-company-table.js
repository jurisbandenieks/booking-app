/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("companies", {
    id: "id",
    name: { type: "varchar(1000)", notNull: true, unique: true },
    country: { type: "varchar(1000)", notNull: true },
    region: { type: "varchar(1000)" },
    address: { type: "varchar(1000)", notNull: true },
    phone_number: { type: "varchar(1000)", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });

  pgm.addConstraint("companies", "unique_company_name", {
    unique: ["name"]
  });
};

exports.down = (pgm) => {};
