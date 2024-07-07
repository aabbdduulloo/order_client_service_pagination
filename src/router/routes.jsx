import { Icon } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import PersonIcon from "@mui/icons-material/Person";

const routes = [
  {
    path: "/main",
    content: "Dashboard",
    icon: <Icon component={DashboardIcon} />,
  },
  {
    path: "/main/order",
    content: "Order",
    icon: <Icon component={ShoppingCartIcon} />,
  },
  {
    path: "/main/service",
    content: "Service",
    icon: <Icon component={RoomServiceIcon} />,
  },
  {
    path: "/main/client",
    content: "Client",
    icon: <Icon component={PersonIcon} />,
  },
];

export default routes;
