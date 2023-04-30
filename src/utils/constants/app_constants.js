export const fireStoreCollections = {
  users: "Users",
  blogs: "Blogs",
};
export const app_routes = {
  login: "/login",
  signup: "/signup",
  profile: "/profile",
  feed: "/feed",
};

export const lockedRoutes = [
  app_routes.profile,
  "/profile/[pid]",
  app_routes.feed,
];
