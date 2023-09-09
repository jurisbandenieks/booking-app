import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  AppBar,
  Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../../config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Public } from "../../links";
import { Private } from "../../links/private";

export const NavBar = () => {
  const [state, setState] = useState(false);
  const [user] = useAuthState(auth);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  const logout = () => {
    signOut(auth);
  };

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Public />
      <Divider />
      <Private />
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                sx={{ marginRight: "12px" }}
                color="primary"
                aria-label="open menu sidebar"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography>Booking App</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Typography>Hello, {user?.email}</Typography>
              <IconButton
                sx={{ marginLeft: "12px" }}
                color="info"
                aria-label="logout from profile"
                onClick={() => logout()}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </>
  );
};
