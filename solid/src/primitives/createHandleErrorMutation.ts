import { TError } from "@/types";
import { CreateMutationResult } from "@tanstack/solid-query";
import { createEffect } from "solid-js";

import log from "@/helpers/log";

const createHandleErrorMutation = <T, T2>(m: CreateMutationResult<T, TError, T2>) => {
    createEffect(() => {
        if (m.isError) {
            log.error.toast(m.error?.message || "");
        }
    });
};

export default createHandleErrorMutation;
