import { useEffect } from "react";
import { Typography } from "@mui/material";
import { checkStatus } from "../../api/login";

export const Dashboard = () => {
  useEffect(() => {
    const fetchStatus = async () => {
      const res = await checkStatus();

      console.log(res);
    };

    fetchStatus();
  }, []);

  return <Typography>Dashboard</Typography>;
};
