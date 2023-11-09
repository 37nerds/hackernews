import { createStore } from "solid-js/store";
import { TLink, nav_links } from "@/config/links";
import { createSignal } from "solid-js";
import { TLoggedUser } from "@/queries/users";

export const [navLinks, setNavLinks] = createStore<TLink[]>([...nav_links]);

export const [hideFooter, setHideFooter] = createSignal<boolean>(false);

export const [hideRightNavLinks, setHideRightNavLinks] = createSignal<boolean>(false);

export const [isProfileLoading, setIsProfileLoading] = createSignal<boolean>(true);
export const [isUserLoggedIn, setIsUserLoggedIn] = createSignal<boolean>(false);
export const [loggedUserData, setLoggedUserData] = createSignal<TLoggedUser | null>(null);
