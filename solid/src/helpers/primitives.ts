import type { TError } from "@/types";
import type { CreateMutationResult } from "@tanstack/solid-query";

import { createEffect, onCleanup, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useLoggedUser } from "@/contexts/loggedUser";
import { setHideFooter } from "@/states/layout";
import { setHideRightNavLinks } from "@/states/layout";
import { nav_links } from "@/config/links";
import { setNavLinks } from "@/states/layout";

import log from "@/helpers/log";

export const createGuestRoute = () => {
    const loggedUser = useLoggedUser();
    const navigate = useNavigate();

    createEffect(() => {
        if (loggedUser?.data()) {
            navigate("/");
        }
    });
};

export const createHandleErrorMutation = <T, T2>(m: CreateMutationResult<T, TError, T2>) => {
    createEffect(() => {
        if (m.isError) {
            log.error.toast(m.error?.message || "");
        }
    });
    return m;
};

export const createHideFooter = () => {
    onMount(() => {
        setHideFooter(true);
    });
    onCleanup(() => {
        setHideFooter(false);
    });
};

export const createHideRightNavLinks = () => {
    onMount(() => {
        setHideRightNavLinks(true);
    });
    onCleanup(() => {
        setHideRightNavLinks(false);
    });
};

export const createOnlyOneNavLink = (title: string, href: string) => {
    onMount(() => {
        setNavLinks([{ title, href }]);
    });
    onCleanup(() => {
        setNavLinks([...nav_links]);
    });
};

export const createAddNavLink = (title: string, href: string, not_href?: boolean) => {
    onMount(() => {
        setNavLinks([...nav_links, { title, href, not_href }]);
    });
    onCleanup(() => {
        setNavLinks([...nav_links]);
    });
};
