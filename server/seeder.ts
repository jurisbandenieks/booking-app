import pgClient from "./config/db";

import { companies, users } from "./data";

const importData = async () => {
  try {
    for (const company of companies) {
      await pgClient.query(
        "INSERT INTO companies (name, country, region, address, phone_number) VALUES ($1, $2, $3, $4, $5)",
        [
          company.name,
          company.country,
          company.region,
          company.address,
          company.phoneNumber
        ]
      );
    }

    for (const user of users) {
      await pgClient.query(
        "INSERT INTO users (first_name, last_name, profile_picture, phone_number, email) VALUES ($1, $2, $3, $4, $5)",
        [
          user.firstName,
          user.lastName,
          user.profilePicture,
          user.phoneNumber,
          user.email
        ]
      );
    }

    console.log("Data imported!");
  } catch (error) {
    console.error(`${error}`);
  }
};

const destroyData = async () => {
  try {
    await pgClient.query("DELETE FROM companies");

    console.log("Data destroyed!");
  } catch (error) {
    console.error(`${error}`);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
