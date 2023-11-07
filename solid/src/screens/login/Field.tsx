import { TSetValue } from "@/types";

import Input from "@/components/ui/Input";

const Field = (p: { id: string; value: string; setValue: TSetValue }) => {
    return (
        <div class="flex items-center gap-2">
            <label for={p.id} class="w-28">
                {p.id}:{" "}
            </label>
            <Input value={p.value} setValue={p.setValue} id={p.id} />
        </div>
    );
};

export default Field;
