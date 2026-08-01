import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout";
import { authpageRoute } from "./authpage";
import { homepageRoute } from "./homepage";
import { dashboadRoute } from "./dashboard";


export const rootRoute = createRootRoute({
  component: RootLayout
})


export const routeTree = rootRoute.addChildren([authpageRoute, homepageRoute, dashboadRoute]);
