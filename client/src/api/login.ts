import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const { getAccessTokenSilently } = useAuth0();

export const updateUser = async () => {
  try {
    const token = await getAccessTokenSilently();

    await axios.get(`/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};
