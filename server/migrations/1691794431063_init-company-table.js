/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  console.log("Seeding Companies");

  pgm.createTable("companies", {
    id: "id",
    name: { type: "varchar(1000)", notNull: true },
    country: { type: "varchar(1000)", notNull: true },
    region: { type: "varchar(1000)", notNull: true },
    address: { type: "varchar(1000)", notNull: true },
    phone: { type: "varchar(1000)", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = (pgm) => {};
