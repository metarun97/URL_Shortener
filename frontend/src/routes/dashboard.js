import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import Dashboard from "../pages/Dashboard";
import { checkAuth } from './../utils/checkAuth';

export const dashboadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
  beforeLoad: checkAuth
})
