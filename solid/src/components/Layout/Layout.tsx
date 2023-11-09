import { Outlet } from "@solidjs/router";
import { createProfileQuery } from "@/queries/users";
import { createEffect } from "solid-js";
import { setIsProfileLoading, setIsUserLoggedIn, setLoggedUserData } from "@/states/layout";

import Nav from "./Nav";
import Footer from "./Footer";
import Container from "@/components/ui/Container";

const Layout = () => {
    const profileQuery = createProfileQuery();

    createEffect(() => {
        console.log("x", profileQuery.isSuccess, profileQuery.isLoading, profileQuery.isError);
        if (profileQuery.isSuccess) {
            setIsProfileLoading(false);
            setIsUserLoggedIn(true);
            setLoggedUserData(JSON.parse(JSON.stringify(profileQuery.data)));
        }

        if (profileQuery.isError) {
            setIsProfileLoading(false);
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
