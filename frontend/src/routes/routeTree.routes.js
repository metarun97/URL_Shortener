import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout";
import { registerRoute } from "./register.route";
import { homepageRoute } from "./home.route";
import { dashboardRoute } from "./dashboard.route";
import { userMeRoute } from "./userme.route";
import { loginRoute } from "./login.route";


export const rootRoute = createRootRoute({
  component: RootLayout
})


export const routeTree = rootRoute.addChildren([registerRoute, loginRoute,homepageRoute, userMeRoute, dashboardRoute]);
