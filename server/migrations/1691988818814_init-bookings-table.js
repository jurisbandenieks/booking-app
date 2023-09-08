/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("bookings", {
    id: "id",
    guests: { type: "varchar(1000)[]", notNull: true },
    receipt_reference: { type: "varchar(1000)", notNull: true },
    split_receipt: { type: "boolean", notNull: true },
    event_id: {
      type: "integer",
      notNull: true,
      references: '"events"',
      onDelete: "cascade"
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade"
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = (pgm) => {};
