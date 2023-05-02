// import { MenuIcon, SearchIcon } from "@mui/icons-material";
// import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setUser, userState } from "@/redux/userSlice";
import { app_routes } from "@/utils/constants/app_constants";
import { authApi } from "@/utils/firebase/auth";

import InputField from "../InputBox";
import { StyledNavbar } from "./StyledNavbar";

function MainNavbar({ notificationBadgeContent = 1 }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const state = useSelector(userState);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function sendToRoute(route) {
    router.push(route);
  }

  async function onClickLogout() {
    await authApi.logout();
    dispatch(setUser(null));
    router.push("/login");
  }

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{ zIndex: 9999 }}
    >
      {state?.user && (
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={notificationBadgeContent} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
      )}
      {state?.user && (
        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            router.push(`${app_routes.profile}/${state?.user?.email}`);
          }}
        >
          <IconButton size="large" color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      )}
      {state?.user && (
        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            onClickLogout();
          }}
        >
          <IconButton size="large" color="inherit">
            <LogoutIcon />
          </IconButton>
          <p>Log Out</p>
        </MenuItem>
      )}

      {!state?.user && (
        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            sendToRoute(app_routes.login);
          }}
        >
          <IconButton size="large" color="inherit">
            <LoginIcon />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      )}

      {!state?.user && (
        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            sendToRoute(app_routes.signup);
          }}
        >
          <IconButton size="large" color="inherit">
            <FollowTheSignsIcon />
          </IconButton>
          <p>Sign Up</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <StyledNavbar>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ background: "#1B263B", color: "#e0e1dd" }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { sm: "block" } }}
            >
              Blogify
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {!state?.user && (
                <>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    // aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={() => {
                      sendToRoute(app_routes.login);
                    }}
                    color="inherit"
                  >
                    <LoginIcon />
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={() => {
                      sendToRoute(app_routes.signup);
                    }}
                    color="inherit"
                  >
                    <FollowTheSignsIcon />
                  </IconButton>
                </>
              )}
              {state?.user && (
                <>
                  <InputField placeholder="Search Email" />
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={() => {
                      router.push(
                        `${app_routes.profile}/${state?.user?.email}`
                      );
                    }}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>

                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="login"
                    // aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={() => {
                      onClickLogout();
                    }}
                    color="inherit"
                  >
                    <LogoutIcon />
                  </IconButton>
                </>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {/* {renderMenu} */}
      </Box>
    </StyledNavbar>
  );
}

export default MainNavbar;
