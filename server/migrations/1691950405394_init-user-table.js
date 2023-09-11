/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    first_name: { type: "varchar(1000)" },
    last_name: { type: "varchar(1000)" },
    profile_picture: { type: "varchar(1000)" },
    phone_number: { type: "varchar(1000)" },
    email: { type: "varchar(1000)", notNull: true, unique: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });

  pgm.createTable("blacklist", {
    id: "id",
    reason: { type: "varchar(1000)", notNull: true },
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

  pgm.createTable("admins", {
    id: "id",
    scopes: { type: "text[]", notNull: true },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade"
    },
    company_id: {
      type: "integer",
      notNull: true,
      references: '"companies"',
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
