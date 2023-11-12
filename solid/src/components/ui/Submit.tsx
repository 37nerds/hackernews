import Button from "./Button";

const Submit = (p: { label?: string }) => {
    return (
        <Button type="submit" class="bg-secondary-bg text-white">
            {p.label || "Submit"}
        </Button>
    );
};

export default Submit;
