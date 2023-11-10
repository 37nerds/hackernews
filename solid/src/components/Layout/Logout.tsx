import { createLogoutMutation } from "@/queries/users";
import { createEffect } from "solid-js";

const Logout = () => {
    const logoutMutation = createLogoutMutation();

    createEffect(() => {
        if (logoutMutation.isSuccess) {
            window.location.reload();
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
