import { auth } from "firebase-functions";
import axios from "axios";

export const createUser = auth.user().onCreate(async (user) => {
  console.log("Creating a new user", user);
  const url = "http://localhost:3050/auth/users/user-created";
  try {
    await axios.post(url, {
      uid: user.uid,
      firstName: user.displayName,
      email: user.email
    });
  } catch (error) {
    console.error(`Failed to post to ${url}`, error);
  }
});
