import { A } from "@solidjs/router";

export default (p: { href: string }) => {
    return (
        <div class="flex justify-end">
            <A href={p.href} class="px-1 underline">
                More
            </A>
        </div>
    );
};
