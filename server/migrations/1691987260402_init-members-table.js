/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("members", {
    id: "id",
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade"
    },
    resourceId: {
      type: "integer",
      notNull: true,
      references: '"resources"',
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
