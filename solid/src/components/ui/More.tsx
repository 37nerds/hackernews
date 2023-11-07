import { A } from "@solidjs/router";

const More = (p: { href: string }) => {
    return (
        <div class="flex justify-end">
            <A href={p.href} class="px-1 underline">
                More
            </A>
        </div>
    );
};

export default More;
