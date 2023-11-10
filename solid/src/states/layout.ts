import { createStore } from "solid-js/store";
import { TLink, nav_links } from "@/config/links";
import { createSignal } from "solid-js";

export const [navLinks, setNavLinks] = createStore<TLink[]>([...nav_links]);

export const [hideFooter, setHideFooter] = createSignal<boolean>(false);

export const [hideRightNavLinks, setHideRightNavLinks] = createSignal<boolean>(false);
