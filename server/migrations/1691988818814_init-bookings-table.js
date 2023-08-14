/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("bookings", {
    id: "id",
    guests: { type: "varchar(1000)[]", notNull: true },
    receiptReference: { type: "varchar(1000)", notNull: true },
    splitReceipt: { type: "boolean", notNull: true },
    eventId: {
      type: "integer",
      notNull: true,
      references: '"events"',
      onDelete: "cascade"
    },
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade"
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = (pgm) => {};
