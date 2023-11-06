import { links, setLinks } from "@/states/layout";
import { onCleanup, onMount } from "solid-js";

export default () => {
    onMount(() => {
        setLinks([...links, { title: "from", href: "/from", not_href: true }]);
    });

    onCleanup(() => {
        setLinks(links => links.filter(link => link.title !== "from"));
    });

    return <>from</>;
};
