import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export const Loading = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(50%, 50%)",
        height: "100vh"
      }}
    >
      <CircularProgress />
    </Box>
  );
};
