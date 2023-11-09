import { For, Show } from "solid-js";
import { hideRightNavLinks, isUserLoggedIn, navLinks } from "@/states/layout";
import { A } from "@solidjs/router";

import Container from "@/components/ui/Container";
import NavLink from "./NavLink";
import Logout from "./Logout";

const Nav = () => {
    return (
        <Container>
            <nav class="flex items-center justify-between rounded bg-secondary-bg px-2 py-1 text-white">
                <div class="flex items-center gap-2">
                    <A href="/" class="font-bold">
                        Hacker News
                    </A>
                    <For each={navLinks}>
                        {link => (
                            <NavLink title={link.title} href={link.href} notHref={link.not_href} />
                        )}
                    </For>
                </div>
                <Show when={!hideRightNavLinks()}>
                    <div class="flex items-center gap-2">
                        <Show
                            when={isUserLoggedIn()}
                            fallback={<NavLink title="login" href="/login" hideBar={true} />}
                        >
                            <NavLink title={"p-nerd (1)"} href="/user" hideBar={true} />
                            <span>|</span>
                            <Logout />
                        </Show>
                    </div>
                </Show>
            </nav>
        </Container>
    );
};

export default Nav;
