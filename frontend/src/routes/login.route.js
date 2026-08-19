import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.routes";
import LoginPage from "../pages/LoginPage";
import { checkAuth } from "../utils/checkAuth";


export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
})
