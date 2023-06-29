export const fireStoreCollections = {
  users: "Users",
  blogs: "Blogs",
};
export const app_routes = {
  login: "/login",
  signup: "/signup",
  profile: "/profile",
  explore: "/explore",
  blog: "/blog",
};

export const loggedInNavButtons = [
  // {
  //   name: "Notifications",
  //   route: "",
  // },
  {
    name: "Profile",
    route: app_routes.profile,
  },
  {
    name: "Logout",
    route: "",
  },
];

export const loggedOutNavButtons = [
  {
    name: "Login",
    route: app_routes.login,
  },
  {
    name: "SignUp",
    route: app_routes.signup,
  },
];

export const loggedInAndOutNavButtons = [
  { route: app_routes.explore, name: "Home" },
];

export const lockedRoutes = ["/profile/[pid]"];

export const authRoutes = [app_routes.login, app_routes.signup];
