import { JSX } from "solid-js";

const Button = (p: {
    children?: string | JSX.Element;
    type?: "submit" | "button";
    class?: string;
    onClick?: () => void;
    disabled?: boolean;
}) => {
    return (
        <button
            onClick={() => p.onClick && p.onClick()}
            type={p.type || "button"}
            class={`rounded px-2 py-1 ${p.class}`}
            disabled={!!p.disabled}
        >
            {p.children || "button"}
        </button>
    );
};

export default Button;
