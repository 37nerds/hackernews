import { For, Show } from "solid-js";
import { hideRightNavLinks, navLinks } from "@/states/layout";
import { A } from "@solidjs/router";

import Container from "@/components/ui/Container";
import NavLink from "./NavLink";

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
                        <NavLink title={"p-nerd (1)"} href="/user" hideBar={true} />
                        <span>|</span>
                        <button>logout</button>
                        <NavLink title="login" href="/login" />
                    </div>
                </Show>
            </nav>
        </Container>
    );
};

export default Nav;
