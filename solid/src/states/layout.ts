import { createStore } from "solid-js/store";
import { TLink, nav_links } from "@/config/links";

export const [navLinks, setNavLinks] = createStore<TLink[]>(nav_links);
