import { Outlet } from "@solidjs/router";
import { createProfileQuery } from "@/queries/users";
import { createEffect } from "solid-js";
import { setIsUserLoggedIn, setLoggedUser } from "@/states/layout";

import Nav from "./Nav";
import Footer from "./Footer";
import Container from "@/components/ui/Container";

const Layout = () => {
    const profileQuery = createProfileQuery();

    createEffect(() => {
        if (profileQuery.isSuccess) {
            setIsUserLoggedIn(true);
            setLoggedUser(JSON.parse(JSON.stringify(profileQuery.data)));
        }
    });

    return (
        <div class="flex flex-col gap-2 py-3">
            <Nav />
            <Container>
                <Outlet />
            </Container>
            <Footer />
        </div>
    );
};

export default Layout;
