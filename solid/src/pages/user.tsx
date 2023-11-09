import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import { isProfileLoading, isUserLoggedIn, loggedUserData } from "@/states/layout";

import createHideFooter from "@/primitives/createHideFooter.ts";

import UForm from "@/screens/user/UForm";
import PWrapper from "@/components/ui/PWrapper";
import ULinks from "@/screens/user/ULinks";

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
                <UForm />
                <ULinks />
            </div>
        </PWrapper>
    );
};
