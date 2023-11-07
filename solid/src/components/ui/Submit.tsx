const Submit = (p: { label?: string }) => {
    return (
        <button type="submit" class="rounded bg-secondary-bg px-2 py-1 text-white">
            {p.label || "Submit"}
        </button>
    );
};

export default Submit;
