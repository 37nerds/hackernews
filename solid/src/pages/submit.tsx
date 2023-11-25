import type { TSetValue, TType } from "@/types";
import type { JSX } from "solid-js";
import type { TStoryType } from "@/queries/stories";

import { createEffect, createSignal } from "solid-js";
import { createSaveNewsMutation } from "@/queries/stories";
import { createHideFooter, createOnlyOneNavLink } from "@/helpers/primitives";
import { useNavigate } from "@solidjs/router";

import Input from "@/components/ui/Input";
import Container2 from "@/components/ui/Container2";
import Submit from "@/components/ui/Submit";
import PWrapper from "@/components/ui/PWrapper";
import Textarea from "@/components/ui/Textarea";

const Wrapper = (p: { children: JSX.Element; itemsPosition?: string }) => {
    return <div class={`flex gap-2 ${p.itemsPosition || "items-center"}`}>{p.children}</div>;
};

const Label = (p: { label?: string; id: string }) => {
    return (
        <label for={p.id} class="w-8 text-[13px] text-secondary">
            {p.label || p.id}
        </label>
    );
};

const LabelInput = (p: { value: string; setValue: TSetValue; id: string; label?: string; type?: TType }) => {
    return (
        <Wrapper>
            <Label label={p.label} id={p.id} />
            <Input type={p.type} id={p.id} value={p.value} setValue={p.setValue} />
        </Wrapper>
    );
};

const LabelTextarea = (p: { value: string; setValue: TSetValue; id: string; label?: string }) => {
    return (
        <Wrapper itemsPosition="items-start">
            <Label label={p.label} id={p.id} />
            <Textarea id={p.id} value={p.value} setValue={p.setValue} />
        </Wrapper>
    );
};

export default () => {
    createHideFooter();
    createOnlyOneNavLink("submit", "/submit");

    const [title, setTitle] = createSignal("");
    const [url, setUrl] = createSignal("");
    const [text, setText] = createSignal("");

    const saveNewsMutation = createSaveNewsMutation();

    const handlerSubmit = () => {
        let type: TStoryType = url() === "" ? "ask" : "link";
        saveNewsMutation.mutate({ type, title: title(), url: url(), text: text() });
    };

    const navigate = useNavigate();
    createEffect(() => {
        if (saveNewsMutation.isSuccess) {
            navigate("/newest");
        }
    });

    return (
        <PWrapper>
            <Container2>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        handlerSubmit();
                    }}
                    class="flex flex-col gap-2 p-2"
                >
                    <LabelInput id="title" value={title()} setValue={setTitle} />
                    <LabelInput id="url" value={url()} setValue={setUrl} />
                    <LabelTextarea id="text" value={text()} setValue={setText} />
                    <div class="flex justify-end">
                        <Submit disabled={saveNewsMutation.isPending} />
                    </div>
                </form>
                <p class="ml-[45px] text-[13px] text-secondary">
                    Leave url blank to submit a question for discussion. If there is no url, text will appear at the top
                    of the thread. If there is a url, text is optional.
                </p>
            </Container2>
        </PWrapper>
    );
};
