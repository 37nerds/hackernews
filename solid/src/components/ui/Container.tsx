import { JSX } from "solid-js";

export default (p: { children: JSX.Element }) => {
    return <div class="mx-auto w-5/6">{p.children}</div>;
};
