export type TLink = {
    title: string;
    href: string;
    not_href?: boolean;
};

const links = [
    {
        title: "welcome",
        href: "/welcome",
    },
    {
        title: "new",
        href: "/newest",
    },
    {
        title: "threads",
        href: "/threads",
    },
    {
        title: "past",
        href: "/front",
    },
    {
        title: "comments",
        href: "/comments",
    },
    {
        title: "ask",
        href: "/ask",
    },
    {
        title: "show",
        href: "/show",
    },
    {
        title: "jobs",
        href: "/jobs",
    },
    {
        title: "submit",
        href: "/submit",
    },
];

export default links;
