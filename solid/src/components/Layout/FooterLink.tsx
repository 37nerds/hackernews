import { Show } from "solid-js";
import { A } from "@solidjs/router";

export default (p: { title: string; href: string; hideBar?: boolean; notDynamic?: boolean }) => {
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
