import axios from "axios";
import { auth } from "../config";

export const checkStatus = async () => {
  const token = await auth.currentUser?.getIdToken();

  return await axios.get("/auth/", {
    headers: { Authorization: token }
  });
};
