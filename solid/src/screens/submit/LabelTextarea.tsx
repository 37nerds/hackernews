import { TSetValue } from "@/types";

import Textarea from "@/components/ui/Textarea";
import Label from "@/screens/submit/Label";
import Wrapper from "./Wrapper";

const LabelTextarea = (p: { value: string; setValue: TSetValue; id: string; label?: string }) => {
    return (
        <Wrapper itemsPosition="items-start">
            <Label label={p.label} id={p.id} />
            <Textarea id={p.id} value={p.value} setValue={p.setValue} />
        </Wrapper>
    );
};

export default LabelTextarea;
