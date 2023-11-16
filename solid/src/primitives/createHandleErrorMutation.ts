import type { TError } from "@/types";
import type { CreateMutationResult } from "@tanstack/solid-query";

import { createEffect } from "solid-js";

import log from "@/helpers/log";

const createHandleErrorMutation = <T, T2>(m: CreateMutationResult<T, TError, T2>) => {
    createEffect(() => {
        if (m.isError) {
            log.error.toast(m.error?.message || "");
        }
    });
    return m;
};

export default createHandleErrorMutation;
