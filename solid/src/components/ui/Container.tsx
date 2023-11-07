import { JSX } from "solid-js";

const Container = (p: { children: JSX.Element }) => {
    return <div class="mx-auto w-5/6">{p.children}</div>;
};

export default Container;
