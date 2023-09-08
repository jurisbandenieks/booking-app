import { auth } from "firebase-functions";
import axios from "axios";
import { User } from "../../models/User";

export const createUser = auth.user().onCreate(async (user) => {
  const url = "http://localhost:3050/auth/users/user-created";

  const userData: User = {
    firstName: (user.displayName ?? "").split(" ")[0] ?? "",
    lastName: user.displayName?.split(" ").pop(),
    profilePicture: user.photoURL,
    phoneNumber: user.phoneNumber,
    email: user.email ?? ""
  };

  try {
    console.log("Creating a new user", userData);

    await axios.post(url, userData);
  } catch (error) {
    console.error(`Failed to post to ${url}`, error);
  }
});
