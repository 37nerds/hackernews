import { setHideFooter } from "@/states/layout";
import { onCleanup, onMount } from "solid-js";

const useHideFooter = () => {
    onMount(() => {
        setHideFooter(true);
    });
    onCleanup(() => {
        setHideFooter(false);
    });
};

export default useHideFooter;
