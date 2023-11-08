import { setHideFooter } from "@/states/layout";
import { onCleanup, onMount } from "solid-js";

const createHideFooter = () => {
    onMount(() => {
        setHideFooter(true);
    });
    onCleanup(() => {
        setHideFooter(false);
    });
};

export default createHideFooter;
