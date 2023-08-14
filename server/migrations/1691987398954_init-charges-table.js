/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("charges", {
    id: "id",
    dateRange: { type: "date[]", notNull: true },
    timeRange: { type: "time[]", notNull: true },
    price: { type: "decimal", notNull: true },
    options: { type: "json" },
    precharge: { type: "boolean", notNull: true },
    reserveCharge: { type: "boolean", notNull: true },
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
