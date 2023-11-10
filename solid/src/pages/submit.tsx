import { createSignal } from "solid-js";

import createHideFooter from "@/primitives/createHideFooter.ts";
import createOnlyOneNavLink from "@/primitives/createOnlyOneNavLink";

import LabelInput from "@/screens/submit/LabelInput";
import LabelTextarea from "@/screens/submit/LabelTextarea";
import Container2 from "@/components/ui/Container2";
import Submit from "@/components/ui/Submit";
import PWrapper from "@/components/ui/PWrapper";

export default () => {
    const [title, setTitle] = createSignal("");
    const [url, setUrl] = createSignal("");
    const [text, setText] = createSignal("");

    createHideFooter();
    createOnlyOneNavLink("submit", "/submit");

    return (
        <PWrapper>
            <Container2>
                <form class="flex flex-col gap-2 p-2">
                    <LabelInput id="title" value={title()} setValue={setTitle} />
                    <LabelInput id="url" value={url()} setValue={setUrl} />
                    <LabelTextarea id="text" value={text()} setValue={setText} />
                    <div class="flex justify-end">
                        <Submit />
                    </div>
                </form>
                <p class="ml-[45px] text-[13px] text-secondary">
                    Leave url blank to submit a question for discussion. If there is no url, text
                    will appear at the top of the thread. If there is a url, text is optional.
                </p>
            </Container2>
        </PWrapper>
    );
};
