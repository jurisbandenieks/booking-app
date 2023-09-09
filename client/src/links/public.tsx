import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export type Route = {
  label?: string;
  ariaLabel?: string;
  link: string;
  icon: any;
};

export const Public = () => {
  const navigate = useNavigate();

  const routes: Route[] = [
    {
      label: "Home",
      ariaLabel: "navigate to start",
      link: "/",
      icon: <HomeIcon />
    }
  ];

  return (
    <List>
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
