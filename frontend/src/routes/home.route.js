import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.routes";
import HomePage from "../pages/HomePage";
import { checkAuth } from "../utils/checkAuth";

export const homepageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,

})
