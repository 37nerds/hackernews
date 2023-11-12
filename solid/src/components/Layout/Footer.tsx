import { For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { TLink, footer_links } from "@/config/links";
import { hideFooter } from "@/states/layout";

import Container from "@/components/ui/Container";

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

export default Footer;
