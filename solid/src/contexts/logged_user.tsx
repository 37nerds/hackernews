import type { TLoggedUser } from "@/queries/users";
import type { JSX, Accessor, Setter } from "solid-js";

import { Show } from "solid-js";
import { createContext, useContext, createSignal, createEffect } from "solid-js";
import { createProfileQuery } from "@/queries/users";

import log from "@/helpers/log";

import Loading from "@/components/ui/Loading";

type TLoggedUserContext = {
    data: Accessor<TLoggedUser | null>;
    setData: Setter<TLoggedUser | null>;
};

const LoggedUserContext = createContext<TLoggedUserContext>();

export const LoggedUserProvider = (p: { children: JSX.Element }) => {
    const [isProfileLoading, setIsProfileLoading] = createSignal<boolean>(true);
    const [loggedUserData, setLoggedUserData] = createSignal<TLoggedUser | null>(null);

    const profileQuery = createProfileQuery();

    createEffect(() => {
        log.debug("profile loading ", profileQuery.isLoading);
    });

    createEffect(() => {
        if (profileQuery.isSuccess && profileQuery.data) {
            setLoggedUserData(profileQuery.data);
            setIsProfileLoading(false);
        }
        if (profileQuery.isError) {
            setIsProfileLoading(false);
            log.debug("field to authenticate");
        }
    });

    const loggedUser = {
        data: loggedUserData,
        setData: setLoggedUserData,
    };

    return (
        <LoggedUserContext.Provider value={loggedUser}>
            <Show when={!isProfileLoading()} fallback={<Loading message="loading in logged user ..." />}>
                {p.children}
            </Show>
        </LoggedUserContext.Provider>
    );
};

export const useLoggedUser = () => {
    return useContext(LoggedUserContext);
};
