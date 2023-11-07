import { TSetValue } from "@/types";
import { For } from "solid-js";

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
}) => {
    return (
        <select
            value={p.value}
            class={`w-full rounded border py-1 ${p.class || ""}`}
            id={p.id}
            name={p.name || p.id}
            onInput={e => {
                p.setValue(e.currentTarget.value);
            }}
        >
            <For each={p.options}>
                {option => <option value={option.value}>{option.label}</option>}
            </For>
        </select>
    );
};

export default Select;
