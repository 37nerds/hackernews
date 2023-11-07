import { A } from "@solidjs/router";

const ULink = (p: { href: string; label: string }) => {
    return (
        <A href={p.href} class="underline">
            {p.label}
        </A>
    );
};

export default ULink;
