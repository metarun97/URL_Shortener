import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.routes";
import { checkAuth } from '../utils/checkAuth';
import { createLazyFileRoute } from "@tanstack/react-router";
import UserMe from "../components/UI/UserMe";

export const userMeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/userInfo",
  component: UserMe,
  beforeLoad: checkAuth
})
