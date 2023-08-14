/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("resources", {
    id: "id",
    name: { type: "varchar(1000)", notNull: true },
    description: { type: "text", notNull: true },
    profilePicture: { type: "varchar(1000)", notNull: true },
    phoneNumber: { type: "varchar(1000)", notNull: true },
    email: { type: "varchar(1000)", notNull: true },
    country: { type: "varchar(1000)", notNull: true },
    region: { type: "varchar(1000)" },
    address: { type: "varchar(1000)", notNull: true },
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
