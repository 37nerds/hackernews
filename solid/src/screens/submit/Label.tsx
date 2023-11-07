const Label = (p: { label?: string; id: string }) => {
    return (
        <label for={p.id} class="w-8 text-[13px] text-secondary">
            {p.label || p.id}
        </label>
    );
};

export default Label;
