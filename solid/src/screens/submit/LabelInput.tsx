import { TSetValue } from "@/types";

import Input from "@/components/ui/Input";
import Label from "./Label";
import Wrapper from "./Wrapper";

const LabelInput = (p: { value: string; setValue: TSetValue; id: string; label?: string; type?: string }) => {
    return (
        <Wrapper>
            <Label label={p.label} id={p.id} />
            <Input type={p.type} id={p.id} value={p.value} setValue={p.setValue} />
        </Wrapper>
    );
};

export default LabelInput;
