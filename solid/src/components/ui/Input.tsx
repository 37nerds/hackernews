const Input = (p: {
    value: string;
    setValue: (value: string) => void;
    id: string;
    type?: string;
    name?: string;
    class?: string;
}) => {
    return (
        <input
            class={`w-full rounded border p-1 ${p.class || ""}`}
            type={p.type || "text"}
            id={p.id}
            name={p.name || p.id}
            value={p.value}
            onChange={e => p.setValue(e.target.value)}
        />
    );
};

export default Input;
