import { createLogoutMutation } from "@/queries/users";
import { setLoggedUserData, setIsUserLoggedIn } from "@/states/layout";
import { createEffect } from "solid-js";

const Logout = () => {
    const logoutMutation = createLogoutMutation();

    createEffect(() => {
        if (logoutMutation.isSuccess) {
            setIsUserLoggedIn(false);
            setLoggedUserData({});
        }
    });

    return (
        <button
            onClick={() => {
                logoutMutation.mutate(null);
            }}
        >
            logout
        </button>
    );
};

export default Logout;
