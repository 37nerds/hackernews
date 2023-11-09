import { createStore } from "solid-js/store";
import { TLink, nav_links } from "@/config/links";
import { createSignal } from "solid-js";
import { TUser } from "@/queries/users";

export const [navLinks, setNavLinks] = createStore<TLink[]>([...nav_links]);

export const [hideFooter, setHideFooter] = createSignal<boolean>(false);

export const [hideRightNavLinks, setHideRightNavLinks] = createSignal<boolean>(false);

export const [isUserLoggedIn, setIsUserLoggedIn] = createSignal<boolean>(false);
export const [loggedUser, setLoggedUser] = createStore<TUser | {}>({});
