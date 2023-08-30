import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import { Loading, NavBar } from "..";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";

const Layout: React.FC = () => {
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

export const LayoutWithAuth = withAuthenticationRequired(Layout, {
  onRedirecting: () => <Loading />
});
