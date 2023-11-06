import { Outlet } from "@solidjs/router";

import Nav from "./Nav";
import Footer from "./Footer";
import Container from "@/components/ui/Container";

export default () => {
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
