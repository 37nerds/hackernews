import { createMutation } from "@tanstack/solid-query";
import { TError } from "@/types";

import http from "@/helpers/http";

export const useRegisterMutation = () => {
    const m = createMutation<{}, TError, { username: string; password: string }>(() => ({
        mutationFn: d => http.post("/users/register", d, 201),
        mutationKey: ["register"],
    }));

    return m;
};
