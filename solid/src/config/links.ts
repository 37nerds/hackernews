export type TLink = {
    title: string;
    href: string;
    not_href?: boolean;
    not_dynamic?: boolean;
};

export const nav_links = [
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

export const footer_links = [
    {
        title: "Guidelines",
        href: "/guidelines",
    },
    {
        title: "FAQ",
        href: "/faq",
    },
    {
        title: "Lists",
        href: "/lists",
    },
    {
        title: "API",
        href: "https://github.com/p-nerd/hackerstory",
    },
    {
        title: "Security",
        href: "/security",
    },
    {
        title: "Legal",
        href: "/legal",
    },
    {
        title: "Apply",
        href: "/apply",
    },
    {
        title: "Contact",
        href: "mailto:someone@example.com",
        not_dynamic: true,
    },
];
