import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "../components/Header";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col">
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
