/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("charges", {
    id: "id",
    date_range: { type: "date[]", notNull: true },
    time_range: { type: "time[]", notNull: true },
    price: { type: "decimal", notNull: true },
    options: { type: "json" },
    precharge: { type: "boolean", notNull: true },
    reserve_charge: { type: "boolean", notNull: true },
    resource_id: {
      type: "integer",
      notNull: true,
      references: '"resources"',
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
