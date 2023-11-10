import { createIsLoggedUser } from "@/pages/user";
import { Show } from "solid-js";

import Link from "@/components/ui/Link";

const UserPageLinks = () => {
    const isLoggedUser = createIsLoggedUser();
    return (
        <div class="flex flex-col gap-1 pl-[98px]">
            <Show when={isLoggedUser()}>
                <Link label="change password" href="/change-password" />
            </Show>
            <Link label="submissions" href="/submissions" />
            <Link label="comments" href="/comments" />
            <Show when={isLoggedUser()}>
                <Link label="hidden" href="/hidden" />
                <Link label="favorites submissions" href="/favorites" />
                <Link label="favorites comments" href="/favorites?comments=true" />
            </Show>
            <Show when={!isLoggedUser()}>
                <Link label="favorites" href="/favorites" />
            </Show>
        </div>
    );
};

export default UserPageLinks;
