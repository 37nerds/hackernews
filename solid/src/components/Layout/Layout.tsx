import { JSX } from "solid-js";

import Nav from "./Nav";
import Footer from "./Footer";

export default (p: { children: JSX.Element }) => {
    return (
        <div class="flex flex-col gap-2 py-3">
            <Nav />
            {p.children}
            <Footer />
        </div>
    );
};
