import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.routes";
import { checkAuth } from '../utils/checkAuth';
import ProfilePage from "../pages/ProfilePage";

export const userMeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/userme",
  component: ProfilePage,
  beforeLoad: checkAuth
})
