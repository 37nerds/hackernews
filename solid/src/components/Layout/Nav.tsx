import { For, Show } from "solid-js";
import { TLink } from "@/config/links";
import { links } from "@/states/layout";
import { A, useLocation } from "@solidjs/router";

import Container from "@/components/ui/Container";

const NavLink = (p: TLink & { hideBar?: boolean }) => {
    const location = useLocation();

    return (
        <div class="flex justify-between gap-2">
            <Show when={!p.hideBar}>
                <span>|</span>
            </Show>
            <span class={location.pathname === p.href ? "text-primary" : "text-white"}>
                {p.not_href ? <span>{p.title}</span> : <A href={p.href}>{p.title}</A>}
            </span>
        </div>
    );
};

export default () => {
    return (
        <Container>
            <nav class="flex items-center justify-between bg-secondary-bg px-1 py-0.5 text-white">
                <div class="flex items-center gap-2">
                    <A href="/" class="font-bold">
                        Hacker News
                    </A>
                    <For each={links}>
                        {link => (
                            <NavLink title={link.title} href={link.href} not_href={link.not_href} />
                        )}
                    </For>
                </div>
                <div class="flex items-center gap-2">
                    <NavLink title={"p-nerd (1)"} href="/user" hideBar={true} />
                    <span>|</span>
                    <button>logout</button>
                </div>
            </nav>
        </Container>
    );
};
