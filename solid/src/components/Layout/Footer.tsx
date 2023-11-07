import { For, Show } from "solid-js";
import { TLink, footer_links } from "@/config/links";
import { hideFooter } from "@/states/layout";

import Container from "@/components/ui/Container";
import FooterLink from "./FooterLink";

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
