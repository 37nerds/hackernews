import { createLogoutMutation } from "@/queries/users";

const Logout = () => {
    const logoutMutation = createLogoutMutation();

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
