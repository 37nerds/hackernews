import { TSetValue } from "@/types";
import { Show } from "solid-js";

const Input = (p: {
    value: string;
    setValue: TSetValue;
    id: string;
    type?: string;
    name?: string;
    class?: string;
    errorMessage?: string;
    required?: boolean;
}) => {
    return (
        <div class="flex w-full flex-col gap-1">
            <input
                class={`w-full rounded border p-1 ${p.class || ""}`}
                type={p.type || "text"}
                id={p.id}
                name={p.name || p.id}
                value={p.value}
                onInput={e => {
                    p.setValue(e.currentTarget.value);
                }}
                required={!!p.required}
            />
            <Show when={p.errorMessage}>
                <div class="text-[13px] text-red-500">{p.errorMessage}</div>
            </Show>
        </div>
    );
};

export default Input;
