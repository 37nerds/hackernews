import { nav_links } from "@/config/links";
import { setNavLinks } from "@/states/layout";
import { createSignal, onCleanup, onMount } from "solid-js";

import useHideFooter from "@/hooks/useHideFooter";

import LabelInput from "@/screens/submit/LabelInput";
import LabelTextarea from "@/screens/submit/LabelTextarea";

export default () => {
    const [title, setTitle] = createSignal("");
    const [url, setUrl] = createSignal("");
    const [text, setText] = createSignal("");

    useHideFooter();

    onMount(() => {
        setNavLinks(links => links.filter(link => link.title === "submit"));
    });
    onCleanup(() => {
        setNavLinks(() => nav_links);
    });

    return (
        <div class="bg-primary-bg p-5">
            <form class="flex w-[500px] flex-col gap-2 p-2">
                <LabelInput id="title" value={title()} setValue={setTitle} />
                <LabelInput id="url" value={url()} setValue={setUrl} />
                <LabelTextarea id="text" value={text()} setValue={setText} />
                <div>
                    <button type="submit" class="ml-[38px] bg-secondary-bg px-2 py-1 text-white">
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
