import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";
import { Route } from ".";

export const Private = () => {
  const navigate = useNavigate();

  const routes: Route[] = [
    {
      label: "Admin",
      ariaLabel: "navigate to company view",
      link: "/admin",
      icon: <AdminPanelSettingsIcon />
    }
  ];

  return (
    <List>
      <ListItem>
        <Typography>Admin</Typography>
      </ListItem>

      {routes.map((route) => (
        <ListItem key={route.link} disablePadding>
          <ListItemButton>
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText
              primary={route.label}
              aria-label={route.ariaLabel}
              onClick={() => navigate(route.link)}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
