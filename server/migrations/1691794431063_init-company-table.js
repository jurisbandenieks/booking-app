/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("companies", {
    id: "id",
    name: { type: "varchar(1000)", notNull: true },
    country: { type: "varchar(1000)", notNull: true },
    region: { type: "varchar(1000)" },
    address: { type: "varchar(1000)", notNull: true },
    phoneNumber: { type: "varchar(1000)", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = (pgm) => {};
