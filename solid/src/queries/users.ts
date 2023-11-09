import { TError } from "@/types";
import { createMutation } from "@tanstack/solid-query";

import http from "@/helpers/http";
import createHandleErrorMutation from "@/primitives/createHandleErrorMutation";

export const createRegisterMutation = () => {
    const m = createMutation<{}, TError, { username: string; password: string }>(() => ({
        mutationFn: d => http.post("/users/register", d, 201),
        mutationKey: ["register"],
    }));
    createHandleErrorMutation(m);
    return m;
};
