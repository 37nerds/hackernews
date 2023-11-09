import { createIsLoggedUser } from "@/pages/user";
import ULink from "./ULink";
import { Show } from "solid-js";

const ULinks = () => {
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

export default ULinks;
