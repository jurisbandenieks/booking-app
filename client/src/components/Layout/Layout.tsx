import { Outlet } from "react-router";
import { NavBar } from "..";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";

export const Layout: React.FC = () => {
  return (
    <Box>
      <CssBaseline />
      <NavBar />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: "100vh",
          p: { xs: 2, sm: 3 },
          pt: { xs: 9, sm: 11 }
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
