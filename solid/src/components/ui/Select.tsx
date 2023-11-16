import { TSetValue } from "@/types";
import { For, Show } from "solid-js";

export type TOption = {
    label: string;
    value: string;
};

const Select = (p: {
    value: string;
    setValue: TSetValue;
    id: string;
    type?: string;
    name?: string;
    class?: string;
    options: TOption[];
    disabled?: boolean;
}) => {
    return (
        <Show
            when={!p.disabled}
            fallback={
                <input
                    class={`w-full rounded border p-1 ${p.class || ""}`}
                    type="text"
                    id={p.id}
                    name={p.name || p.id}
                    value={p.value}
                    disabled={true}
                />
            }
        >
            <select
                value={p.value}
                class={`w-full rounded border py-1 ${p.class || ""}`}
                id={p.id}
                name={p.name || p.id}
                onInput={e => {
                    p.setValue(e.currentTarget.value);
                }}
            >
                <For each={p.options}>{option => <option value={option.value}>{option.label}</option>}</For>
            </select>
        </Show>
    );
};

export default Select;
