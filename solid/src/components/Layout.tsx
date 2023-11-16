import { For, Show, createEffect } from "solid-js";
import { hideRightNavLinks, navLinks } from "@/states/layout";
import { useLoggedUser } from "@/contexts/loggedUser.tsx";
import { A, useLocation } from "@solidjs/router";
import { createLogoutMutation } from "@/queries/users";
import { Outlet } from "@solidjs/router";
import { TLink, footer_links } from "@/config/links";
import { hideFooter } from "@/states/layout";

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
                        {link => <NavLink title={link.title} href={link.href} notHref={link.not_href} />}
                    </For>
                </div>
                <Show when={!hideRightNavLinks()}>
                    <div class="flex items-center gap-2">
                        <Show
                            when={!!loggedUser?.data()}
                            fallback={<NavLink title="login" href="/login" hideBar={true} />}
                        >
                            <NavLink
                                title={`${loggedUser?.data()?.username || ""}(${loggedUser?.data()?.karma || 0})`}
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

const FooterLink = (p: { title: string; href: string; hideBar?: boolean; notDynamic?: boolean }) => {
    return (
        <div class="flex justify-between gap-1 text-[12px]">
            <Show when={!p.hideBar}>
                <span class="text-secondary">|</span>
            </Show>
            {p.notDynamic ? (
                <a class="text-primary visited:text-secondary" href={p.href}>
                    {p.title}
                </a>
            ) : (
                <A class="text-primary visited:text-secondary" href={p.href}>
                    {p.title}
                </A>
            )}
        </div>
    );
};

const Footer = () => {
    return (
        <Show when={!hideFooter()} fallback={<></>}>
            <Container>
                <footer class="flex flex-col items-center border-t-4 border-secondary-bg">
                    <div class="flex gap-1 py-1.5">
                        <For each={footer_links}>
                            {(link: TLink, i) => (
                                <FooterLink
                                    title={link.title}
                                    href={link.href}
                                    notDynamic={link.not_dynamic}
                                    hideBar={i() === 0}
                                />
                            )}
                        </For>
                    </div>
                    <div class="flex gap-1 py-1.5 text-base">
                        <span class="text-secondary">Search:</span>
                        <input class="border" />
                    </div>
                </footer>
            </Container>
        </Show>
    );
};

const Layout = () => (
    <div class="flex flex-col gap-2 py-3">
        <Nav />
        <Container>
            <Outlet />
        </Container>
        <Footer />
    </div>
);

export default Layout;
