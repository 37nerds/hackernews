import { Routes, Route } from "@solidjs/router";
import { For } from "solid-js";
import { TRoute } from "@/config/routes";

import Page404 from "@/components/ui/404";
import Layout from "@/components/Layout";
import routes from "@/config/routes";

const App = () => {
    return (
        <Routes>
            <Route path="/" component={Layout}>
                <For each={routes}>
                    {(route: TRoute) => <Route path={route.path} component={route.component} />}
                </For>
            </Route>
            <Route path="*" component={Page404} />
        </Routes>
    );
};

export default App;
