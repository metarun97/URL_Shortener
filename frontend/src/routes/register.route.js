import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.routes";
import RegisterPage from "../pages/RegisterPage";

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
})
