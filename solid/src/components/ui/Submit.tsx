import Button from "./Button";

const Submit = (p: { label?: string; disabled?: boolean }) => {
    return (
        <Button type="submit" class="bg-secondary-bg text-white" disabled={p.disabled}>
            {p.label || "Submit"}
        </Button>
    );
};

export default Submit;
