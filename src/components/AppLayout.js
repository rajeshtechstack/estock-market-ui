import * as React from "react";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import BusinessIcon from "@mui/icons-material/Business";
import ListItemText from "@mui/material/ListItemText";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Avatar, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { DataTable } from "primereact/datatable";
import DailogBox from "./DailogBox";
import MuiDrawer from "@mui/material/Drawer";
import EstockAppBar from "./EstockAppBar";
import Paper from "@mui/material/Paper";
import { Routes, Route, Link, Switch, useNavigate } from "react-router-dom";
import Welcome from "../features/companies/Welcome";
import UsersList from "../features/users/UsersList";
import MuiAppBar from "@mui/material/AppBar";
import UserService from "../services/user.service";
import { useCallback } from "react";
import { useEffect } from "react";
import { setGlobal } from "../services/global";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AppLayout() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    

  };
  const handleLogout = () => {
    setAnchorElUser(null);
    navigate("/");
    UserService.getUserToken({data:{}}, false);

  };
  useEffect(() => {
      
    getUserDetails();
  }, []);

  const getUserDetails = useCallback(() => {
    UserService.getUserInfo()
        .then((res) => {
          let result = res?.data?.data;
          console.log("User Info: ", res);
  
          if (res?.status === 200) {
           
              
              setUser(result)
            
          } else {
            
          
          }
        })
        .catch((error) => {
          // Error
          if (error.response) {
          }
        });
    }, []);

    
  return (
    <div>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>

          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.firstName} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '50px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={user?.firstName} onClick={handleCloseUserMenu}>
              <Typography textAlign="center" >{user?.firstName} {user?.lastName}</Typography>
              </MenuItem>
              <MenuItem key="logout" onClick={handleLogout}>
              <Typography textAlign="center" >Logout</Typography>
              </MenuItem>
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <Link to="/dashboard">
              <ListItemText primary="Companies" />
            </Link>
          </ListItemButton>
          {/*<Divider />*/}
          <ListItemButton>
            <ListItemIcon>
              <Inventory2Icon />
            </ListItemIcon>

            <Link to="/stocks">
              <ListItemText primary="Stocks" />
            </Link>
          </ListItemButton>
        </List>
      </Drawer>
    </div>
  );
}
