import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { nav_links } from "@/config/links";
import { setHideFooter, setNavLinks } from "@/states/layout";
import { createSignal, onCleanup, onMount } from "solid-js";
import { JSX } from "solid-js";

const Label = (p: { label?: string; id: string }) => {
    return (
        <label for={p.id} class="w-8 text-[13px] text-secondary">
            {p.label || p.id}
        </label>
    );
};

const Wrapper = (p: { children: JSX.Element; itemsPosition?: string }) => {
    return <div class={`flex gap-2 ${p.itemsPosition || "items-center"}`}>{p.children}</div>;
};

const LabelInput = (p: {
    value: string;
    setValue: (value: string) => void;
    id: string;
    label?: string;
    type?: string;
}) => {
    return (
        <Wrapper>
            <Label label={p.label} id={p.id} />
            <Input type={p.type} id={p.id} value={p.value} setValue={p.setValue} />
        </Wrapper>
    );
};

const LabelTextarea = (p: {
    value: string;
    setValue: (value: string) => void;
    id: string;
    label?: string;
}) => {
    return (
        <Wrapper itemsPosition="items-start">
            <Label label={p.label} id={p.id} />
            <Textarea id={p.id} value={p.value} setValue={p.setValue} />
        </Wrapper>
    );
};

export default () => {
    const [title, setTitle] = createSignal("");
    const [url, setUrl] = createSignal("");
    const [text, setText] = createSignal("");

    onMount(() => {
        setHideFooter(true);
        setNavLinks(links => links.filter(link => link.title === "submit"));
    });
    onCleanup(() => {
        setHideFooter(false);
        setNavLinks(() => nav_links);
    });

    return (
        <div class="bg-primary-bg p-5">
            <form class="flex w-[500px] flex-col gap-2 p-2">
                <LabelInput id="title" value={title()} setValue={setTitle} />
                <LabelInput id="url" value={url()} setValue={setUrl} />
                <LabelTextarea id="text" value={text()} setValue={setText} />
                <div>
                    <button
                        type="submit"
                        class="ml-[38px] rounded bg-secondary-bg px-2 py-1 text-white"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <p class="ml-[45px] text-[13px] text-secondary">
                Leave url blank to submit a question for discussion. If there is no url, text will
                appear at the top of the thread. If there is a url, text is optional.
            </p>
        </div>
    );
};
