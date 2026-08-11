import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.routes";
import DashboardPage from "../pages/DashboardPage";
import { checkAuth } from '../utils/checkAuth';

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
  beforeLoad: checkAuth
})
