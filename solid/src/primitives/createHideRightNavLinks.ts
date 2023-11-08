import { setHideRightNavLinks } from "@/states/layout";
import { onCleanup, onMount } from "solid-js";

const createHideRightNavLinks = () => {
    onMount(() => {
        setHideRightNavLinks(true);
    });
    onCleanup(() => {
        setHideRightNavLinks(false);
    });
};

export default createHideRightNavLinks;
