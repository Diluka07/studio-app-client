import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

  const {
    loading: userLoading,
    data: user,
    error: userError,
  } = useSelector((state) => state.authentication.loggedUserData);

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
      <ListItemButton onClick={() => navigate(`/new-item-rental`)}>
        <ListItemIcon>
          <WorkIcon style={{ color: "#1976d2" }} />
        </ListItemIcon>
        <ListItemText primary="Product Rentals" />
      </ListItemButton>

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
      {user && user.role == "manager" && (
        <ListItemButton onClick={() => navigate(`/user-list`)}>
          <ListItemIcon>
            <PeopleIcon style={{ color: "#1976d2" }} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      )}
      <ListItemButton>
        <ListItemIcon>
          <ReceiptIcon style={{ color: "#1976d2" }} />
        </ListItemIcon>
        <ListItemText primary="Damage Charge" />
      </ListItemButton>
      {user && user.role == "manager" && (
        <ListItemButton>
          <ListItemIcon>
            <BuildIcon style={{ color: "#1976d2" }} />
          </ListItemIcon>
          <ListItemText primary="Maintanence" />
        </ListItemButton>
      )}
      {user && user.role == "manager" && (
        <>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <AssessmentIcon style={{ color: "#1976d2" }} />
            </ListItemIcon>
            <ListItemText primary="Reports" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate(`/stock-report`)}
              >
                <ListItemIcon>
                  <ArrowRightIcon
                    fontSize="large"
                    style={{ color: "#1976d2" }}
                  />
                </ListItemIcon>
                <ListItemText primary="Stock Report" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate(`/rental-report`)}
              >
                <ListItemIcon>
                  <ArrowRightIcon
                    fontSize="large"
                    style={{ color: "#1976d2" }}
                  />
                </ListItemIcon>
                <ListItemText primary="Rental Report" />
              </ListItemButton>
            </List>
          </Collapse>
        </>
      )}
    </List>
  );
};

export default SideNavbar;
