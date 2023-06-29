// import { MenuIcon, SearchIcon } from "@mui/icons-material";
// import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  AppBar,
  // Badge,
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
import {
  app_routes,
  loggedInAndOutNavButtons,
  loggedInNavButtons,
  loggedOutNavButtons,
} from "@/utils/constants/app_constants";
import { authApi } from "@/utils/firebase/auth";

import NavButtons from "./NavButtons";
// import InputField from "../InputField";
import { MobMenuBtn, StyledNavbar } from "./StyledNavbar";

// props : { notificationBadgeContent = 1 }
function MainNavbar() {
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
      className="mobMenuItem"
    >
      {/* {state?.user && (
        <MenuItem onClick={handleMobileMenuClose}>
          <MobMenuBtn>
            <p>Notifications</p>
            <Badge
              badgeContent={notificationBadgeContent}
              color="error"
            ></Badge>
          </MobMenuBtn>
        </MenuItem>
      )} */}
      <MenuItem
        onClick={() => {
          handleMobileMenuClose();
          router.push(`${app_routes.explore}`);
        }}
      >
        <MobMenuBtn>
          <p>Home</p>
        </MobMenuBtn>
      </MenuItem>
      {state?.user && (
        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            router.push(`${app_routes.profile}/${state?.user?.email}`);
          }}
        >
          <MobMenuBtn>
            <p>Profile</p>
          </MobMenuBtn>
        </MenuItem>
      )}
      {state?.user && (
        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            onClickLogout();
          }}
        >
          <MobMenuBtn>
            <p>Logout</p>
          </MobMenuBtn>
        </MenuItem>
      )}

      {!state?.user && (
        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            sendToRoute(app_routes.login);
          }}
        >
          <MobMenuBtn>
            <p>Login</p>
          </MobMenuBtn>
        </MenuItem>
      )}

      {!state?.user && (
        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            sendToRoute(app_routes.signup);
          }}
        >
          <MobMenuBtn>
            <p>Sign Up</p>
          </MobMenuBtn>
        </MenuItem>
      )}
    </Menu>
  );

  function renderNavButton(e) {
    return (
      <NavButtons
        key={e.name}
        title={e.name}
        onClick={() => {
          e.name === "Logout"
            ? onClickLogout()
            : e.name === "Profile"
            ? router.push(`${e.route}/${state?.user?.email}`)
            : router.push(e.route);
        }}
      />
    );
  }

  return (
    <StyledNavbar>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ background: "#1B263B", color: "#E0E1DD" }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { sm: "block", cursor: "pointer" } }}
              onClick={() => {
                sendToRoute("/");
              }}
            >
              Blogify
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {loggedInAndOutNavButtons.map((e) => {
                return renderNavButton(e);
              })}

              {!state?.user && (
                <>
                  {loggedOutNavButtons.map((e) => {
                    return renderNavButton(e);
                  })}
                </>
              )}

              {state?.user && (
                <>
                  {/* <InputField placeholder="Search Email" /> */}
                  {loggedInNavButtons.map((e) => {
                    return renderNavButton(e);
                  })}
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
                sx={{ justifyContent: "flex-end" }}
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
