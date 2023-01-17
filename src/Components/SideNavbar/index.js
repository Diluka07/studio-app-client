import * as React from "react";
import { useNavigate } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupsIcon from "@mui/icons-material/Groups";
import BuildIcon from "@mui/icons-material/Build";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const SideNavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        color: "#1976d2",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Navigation
      //   </ListSubheader>
      // }
    >
      <ListItemButton onClick={() => navigate(`/dashboard`)}>
        <ListItemIcon>
          <HomeIcon style={{ color: "#1976d2" }} />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <WorkIcon style={{ color: "#1976d2" }} />
        </ListItemIcon>
        <ListItemText primary="Product Rentals" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ArrowRightIcon fontSize="large" style={{ color: "#1976d2" }} />
            </ListItemIcon>
            <ListItemText primary="New Rental" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ArrowRightIcon fontSize="large" style={{ color: "#1976d2" }} />
            </ListItemIcon>
            <ListItemText primary="Finish Rental" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton>
        <ListItemIcon>
          <BusinessIcon style={{ color: "#1976d2" }} />
        </ListItemIcon>
        <ListItemText primary="Studio Rentals" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate(`/item-list`)}>
        <ListItemIcon>
          <InventoryIcon style={{ color: "#1976d2" }} />
        </ListItemIcon>
        <ListItemText primary="Inventory" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate(`/customer-list`)}>
        <ListItemIcon>
          <GroupsIcon style={{ color: "#1976d2" }} />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate(`/user-list`)}>
        <ListItemIcon>
          <PeopleIcon style={{ color: "#1976d2" }} />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ReceiptIcon style={{ color: "#1976d2" }} />
        </ListItemIcon>
        <ListItemText primary="Damage Charge" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BuildIcon style={{ color: "#1976d2" }} />
        </ListItemIcon>
        <ListItemText primary="Maintanence" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AssessmentIcon style={{ color: "#1976d2" }} />
        </ListItemIcon>
        <ListItemText primary="Reports" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ArrowRightIcon fontSize="large" style={{ color: "#1976d2" }} />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default SideNavbar;
