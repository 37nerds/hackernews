import { TSetValue } from "@/types";

const Textarea = (p: {
    value: string;
    setValue: TSetValue;
    id: string;
    name?: string;
    class?: string;
}) => {
    return (
        <textarea
            class={`w-full rounded border p-1 ${p.class || ""}`}
            rows={3}
            id={p.id}
            name={p.name || p.id}
            onInput={e => {
                p.setValue(e.target.value);
            }}
        >
            {p.value}
        </textarea>
    );
};

export default Textarea;
