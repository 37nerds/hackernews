import { JSX } from "solid-js";

const Container2 = (p: { children: JSX.Element; class?: string }) => {
    return <div class={`mx-auto w-[600px] ${p.class || ""}`}>{p.children}</div>;
};

export default Container2;
