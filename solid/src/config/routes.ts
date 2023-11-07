import { Component, lazy } from "solid-js";

export type TRoute = {
    path: string;
    component: Component;
};

export const public_routes: TRoute[] = [
    {
        path: "/login",
        component: lazy(() => import("@/pages/login")),
    },
    {
        path: "/forgot-password",
        component: lazy(() => import("@/pages/forgot-password")),
    },
];

export const layout_routes: TRoute[] = [
    {
        path: "/",
        component: lazy(() => import("@/pages/root")),
    },
    {
        path: "/welcome",
        component: lazy(() => import("@/pages/welcome")),
    },
    {
        path: "/from",
        component: lazy(() => import("@/pages/from")),
    },
    {
        path: "/newest",
        component: lazy(() => import("@/pages/newest")),
    },
    {
        path: "/threads",
        component: lazy(() => import("@/pages/threads")),
    },
    {
        path: "/front",
        component: lazy(() => import("@/pages/front")),
    },
    {
        path: "/comments",
        component: lazy(() => import("@/pages/comments")),
    },
    {
        path: "/ask",
        component: lazy(() => import("@/pages/ask")),
    },
    {
        path: "/show",
        component: lazy(() => import("@/pages/show")),
    },
    {
        path: "/jobs",
        component: lazy(() => import("@/pages/jobs")),
    },
    {
        path: "/submit",
        component: lazy(() => import("@/pages/submit")),
    },
    {
        path: "/user",
        component: lazy(() => import("@/pages/user")),
    },
    {
        path: "/reset-password",
        component: lazy(() => import("@/pages/reset-password")),
    },
    {
        path: "/change-password",
        component: lazy(() => import("@/pages/change-password")),
    },
];
