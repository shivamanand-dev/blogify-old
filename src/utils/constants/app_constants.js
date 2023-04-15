export const app_routes = {
  login: "/login",
  signup: "/signup",
  profile: "/profile",
};

export const lockedRoutes = [app_routes.profile, "/profile/[pid]"];
