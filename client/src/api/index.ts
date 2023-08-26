import axios from "axios";

export const checkApi = async () => {
  const { data } = await axios.get("api/");

  return data;
};
