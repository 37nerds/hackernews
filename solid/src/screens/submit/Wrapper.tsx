import { JSX } from "solid-js";

const Wrapper = (p: { children: JSX.Element; itemsPosition?: string }) => {
    return <div class={`flex gap-2 ${p.itemsPosition || "items-center"}`}>{p.children}</div>;
};

export default Wrapper;
