import { Show } from "solid-js";
import { A, useLocation } from "@solidjs/router";

export default (p: { title: string; href: string; hideBar?: boolean; notHref?: boolean }) => {
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
