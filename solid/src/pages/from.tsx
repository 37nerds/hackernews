import { navLinks, setNavLinks } from "@/states/layout";
import { onCleanup, onMount } from "solid-js";

export default () => {
    onMount(() => {
        setNavLinks([...navLinks, { title: "from", href: "/from", not_href: true }]);
    });

    onCleanup(() => {
        setNavLinks(links => links.filter(link => link.title !== "from"));
    });

    return <>from</>;
};
