export const userService = {
  saveToken,
};

import { app_routes } from "@/utils/constants/app_constants";

async function saveToken(authToken) {
  await fetch(`/api${app_routes.login}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authToken),
  });
}
