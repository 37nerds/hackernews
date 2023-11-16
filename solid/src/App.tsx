import type { TRoute } from "@/config/routes";

import { Routes, Route } from "@solidjs/router";
import { For, Suspense } from "solid-js";
import { layout_routes, public_routes } from "@/config/routes";
import { MetaProvider } from "@solidjs/meta";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { Toaster } from "solid-toast";
import { LoggedUserProvider } from "./contexts/loggedUser";

import Page404 from "@/components/ui/404";
import Layout from "@/components/Layout";
import Loading from "./components/ui/Loading";

const RenderRoutes = (p: { routes: TRoute[] }) => {
    return <For each={p.routes}>{(route: TRoute) => <Route path={route.path} component={route.component} />}</For>;
};

const XRoutes = () => (
    <Routes>
        <RenderRoutes routes={public_routes} />
        <Route path="/" component={Layout}>
            <RenderRoutes routes={layout_routes} />
        </Route>
        <Route path="*" component={Page404} />
    </Routes>
);

const queryClient = new QueryClient();

const App = () => {
    return (
        <Suspense fallback={<Loading message="app suspense loading ..." />}>
            <QueryClientProvider client={queryClient}>
                <MetaProvider>
                    <LoggedUserProvider>
                        <XRoutes />
                        <Toaster />
                    </LoggedUserProvider>
                </MetaProvider>
            </QueryClientProvider>
        </Suspense>
    );
};

export default App;
