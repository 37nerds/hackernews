import { createStore } from "solid-js/store";
import { TLink } from "@/config/links";

import navLinks from "@/config/links";

export const [links, setLinks] = createStore<TLink[]>(navLinks);
