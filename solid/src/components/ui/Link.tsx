import { A } from "@solidjs/router";

const Link = (p: { href: string; label: string }) => {
    return (
        <A href={p.href} class="underline">
            {p.label}
        </A>
    );
};

export default Link;
