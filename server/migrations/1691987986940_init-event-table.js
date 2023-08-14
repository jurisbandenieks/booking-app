/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("events", {
    id: "id",
    date: { type: "date", notNull: true },
    time: { type: "time", notNull: true },
    capacity: { type: "integer", notNull: true },
    statuss: { type: "varchar(1000)", notNull: true },
    minAmount: { type: "integer", notNull: true },
    pendingPeriod: { type: "integer", notNull: true },
    isMemberOnly: { type: "boolean" },
    additionalDiscount: { type: "integer" },
    hasDynamicPricing: { type: "boolean" },
    chargeId: {
      type: "integer",
      notNull: true,
      references: '"charges"',
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

  pgm.createTable("event_extras", {
    id: "id",
    eventId: {
      type: "integer",
      notNull: true,
      references: '"events"',
      onDelete: "cascade"
    },
    extraId: {
      type: "integer",
      notNull: true,
      references: '"extras"',
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
