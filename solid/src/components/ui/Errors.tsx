import { TErrorRecord } from "@/types";
import { For, Show } from "solid-js";

const Errors = (p: { errors?: TErrorRecord }) => {
    return (
        <Show when={!!p.errors}>
            <div class="rounded bg-red-400 p-3 text-[12px] text-white">
                <For each={[...Object.keys(p.errors || {})]}>
                    {key => (
                        <div class="flex gap-2">
                            <div>{key}: </div>
                            <div>{p.errors?.[key]}</div>
                        </div>
                    )}
                </For>
            </div>
        </Show>
    );
};

export default Errors;
