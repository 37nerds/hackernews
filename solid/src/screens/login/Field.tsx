import { JSX } from "solid-js";

const Field = (p: { label?: string; id: string; input: JSX.Element }) => {
    return (
        <div class="flex items-center gap-2">
            <label for={p.id} class="w-28">
                {p.label || p.id}:{" "}
            </label>
            {p.input}
        </div>
    );
};

export default Field;
