import { JSX } from "solid-js";

const Container2 = (p: { children: JSX.Element }) => {
    return <div class="mx-auto w-[600px]">{p.children}</div>;
};

export default Container2;
