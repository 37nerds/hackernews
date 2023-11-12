import { TSetValue } from "@/types";

const Textarea = (p: {
    value: string;
    setValue: TSetValue;
    id: string;
    name?: string;
    class?: string;
    disabled?: boolean;
    rows?: number;
}) => (
    <textarea
        onInput={e => p.setValue(e.target.value)}
        id={p.id}
        name={p.name || p.id}
        class={`w-full rounded border p-1 ${p.class || ""}`}
        disabled={!!p.disabled}
        rows={p.rows || 3}
    >
        {p.value}
    </textarea>
);

export default Textarea;
