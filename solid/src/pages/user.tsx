import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import { isProfileLoading, isUserLoggedIn, loggedUserData } from "@/states/layout";

import createHideFooter from "@/primitives/createHideFooter.ts";

import UserDetails from "@/screens/user/UserDetails";
import PWrapper from "@/components/ui/PWrapper";

export const createIsLoggedUser = () => {
    const [isLoggedUser, setIsLoggedUser] = createSignal(false);

    const params = useParams();
    const navigate = useNavigate();

    createEffect(() => {
        if (isUserLoggedIn()) {
            setIsLoggedUser(params.id ? params.id === loggedUserData()?.username : true);
        } else {
            setIsLoggedUser(false);
            if (!isProfileLoading()) {
                if (!params.id) navigate("/");
            }
        }
    });

    return isLoggedUser;
};

export default () => {
    createHideFooter();

    return (
        <PWrapper>
            <div class="mx-auto flex w-[600px] flex-col gap-2">
                <UserDetails />
            </div>
        </PWrapper>
    );
};
