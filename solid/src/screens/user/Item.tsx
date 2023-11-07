import { JSX } from "solid-js";

const Item = (p: { label: string; value: string | JSX.Element }) => {
    return (
        <div class="flex">
            <span class="w-28 text-secondary">{p.label}: </span>
            <span class="w-full">{p.value}</span>
        </div>
    );
};

export default Item;
