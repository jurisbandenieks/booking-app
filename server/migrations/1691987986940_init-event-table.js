/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("events", {
    id: "id",
    date: { type: "date", notNull: true },
    time: { type: "time", notNull: true },
    capacity: { type: "integer", notNull: true },
    statuss: { type: "varchar(1000)", notNull: true },
    min_amount: { type: "integer", notNull: true },
    pending_period: { type: "integer", notNull: true },
    is_member_only: { type: "boolean" },
    additionalDiscount: { type: "integer" },
    has_dynamic_pricing: { type: "boolean" },
    charge_id: {
      type: "integer",
      notNull: true,
      references: '"charges"',
      onDelete: "cascade"
    },
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

  pgm.createTable("event_extras", {
    id: "id",
    event_id: {
      type: "integer",
      notNull: true,
      references: '"events"',
      onDelete: "cascade"
    },
    extra_id: {
      type: "integer",
      notNull: true,
      references: '"extras"',
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
