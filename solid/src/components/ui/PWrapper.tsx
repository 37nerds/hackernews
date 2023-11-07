import { JSX } from "solid-js";

const PWrapper = (p: { children: JSX.Element }) => {
    return <div class="rounded bg-primary-bg p-5">{p.children}</div>;
};

export default PWrapper;
