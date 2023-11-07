const Textarea = (p: {
    value: string;
    setValue: (value: string) => void;
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
            onChange={e => p.setValue(e.target.value)}
        >
            {p.value}
        </textarea>
    );
};

export default Textarea;
