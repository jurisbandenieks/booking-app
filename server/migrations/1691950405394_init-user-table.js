/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    firstName: { type: "varchar(1000)", notNull: true },
    lastName: { type: "varchar(1000)", notNull: true },
    profilePicture: { type: "varchar(1000)", notNull: true },
    phoneNumber: { type: "varchar(1000)", notNull: true },
    email: { type: "varchar(1000)", notNull: true },
    password: { type: "varchar(1000)", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });

  pgm.createTable("blacklist", {
    id: "id",
    reason: { type: "varchar(1000)", notNull: true },
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

  pgm.createTable("admins", {
    id: "id",
    scopes: { type: "text[]", notNull: true },
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade"
    },
    companyId: {
      type: "integer",
      notNull: true,
      references: '"companies"',
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
