import { nav_links } from "@/config/links";
import { setNavLinks } from "@/states/layout";
import { onCleanup, onMount } from "solid-js";

const createOnlyOneNavLink = (title: string, href: string) => {
    onMount(() => {
        setNavLinks([{ title, href }]);
    });
    onCleanup(() => {
        setNavLinks(() => nav_links);
    });
};

export default createOnlyOneNavLink;
