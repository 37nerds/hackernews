import { createIsLoggedUser } from "@/pages/user";
import { Show } from "solid-js";
import { A } from "@solidjs/router";

const ULink = (p: { href: string; label: string }) => {
    return (
        <A href={p.href} class="underline">
            {p.label}
        </A>
    );
};

const UserPageLinks = () => {
    const isLoggedUser = createIsLoggedUser();
    return (
        <div class="flex flex-col gap-1 pl-[98px]">
            <Show when={isLoggedUser()}>
                <ULink label="change password" href="/change-password" />
            </Show>
            <ULink label="submissions" href="/submissions" />
            <ULink label="comments" href="/comments" />
            <Show when={isLoggedUser()}>
                <ULink label="hidden" href="/hidden" />
                <ULink label="favorites submissions" href="/favorites" />
                <ULink label="favorites comments" href="/favorites?comments=true" />
            </Show>
            <Show when={!isLoggedUser()}>
                <ULink label="favorites" href="/favorites" />
            </Show>
        </div>
    );
};

export default UserPageLinks;
