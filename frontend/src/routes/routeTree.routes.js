import RootLayout from "../RootLayout";
import { createRootRoute } from "@tanstack/react-router";
import { registerRoute } from "./register.route";
import { loginRoute } from "./login.route";
import { homepageRoute } from "./home.route";
import { userMeRoute } from "./userme.route";
import { dashboardRoute } from "./dashboard.route";


export const rootRoute = createRootRoute({
  component: RootLayout
})


export const routeTree = rootRoute.addChildren([registerRoute, loginRoute, homepageRoute, userMeRoute, dashboardRoute]);
