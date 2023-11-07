import { setHideRightNavLinks } from "@/states/layout";
import { onCleanup, onMount } from "solid-js";

const useHideRightNavLinks = () => {
    onMount(() => {
        setHideRightNavLinks(true);
    });
    onCleanup(() => {
        setHideRightNavLinks(false);
    });
};

export default useHideRightNavLinks;
