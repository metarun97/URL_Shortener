import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.routes";
import LoginPage from "../pages/LoginPage";


export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
})
