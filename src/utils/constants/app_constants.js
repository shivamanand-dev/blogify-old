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

export const lockedRoutes = [app_routes.profile, "/profile/[pid]"];
