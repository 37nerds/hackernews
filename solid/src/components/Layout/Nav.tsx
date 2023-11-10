import { For, Show, createEffect } from "solid-js";
import { hideRightNavLinks, navLinks } from "@/states/layout";
import { useLoggedUser } from "@/contexts/loggedUser.tsx";
import { A, useLocation } from "@solidjs/router";
import { createLogoutMutation } from "@/queries/users";

import Container from "@/components/ui/Container";

const NavLink = (p: { title: string; href: string; hideBar?: boolean; notHref?: boolean }) => {
    const location = useLocation();

    return (
        <div class="flex justify-between gap-2">
            <Show when={!p.hideBar}>
                <span>|</span>
            </Show>
            <span class={location.pathname === p.href ? "text-primary" : "text-white"}>
                {p.notHref ? <span>{p.title}</span> : <A href={p.href}>{p.title}</A>}
            </span>
        </div>
    );
};

const Logout = () => {
    const logoutMutation = createLogoutMutation();

    createEffect(() => {
        if (logoutMutation.isSuccess) {
            window.location.reload();
        }
    });

    return (
        <button
            onClick={() => {
                logoutMutation.mutate(null);
            }}
        >
            logout
        </button>
    );
};

const Nav = () => {
    const loggedUser = useLoggedUser();

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
                            when={!!loggedUser?.data()}
                            fallback={<NavLink title="login" href="/login" hideBar={true} />}
                        >
                            <NavLink
                                title={loggedUser?.data()?.username || ""}
                                href="/user"
                                hideBar={true}
                            />
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
