import { useLoggedUser } from "@/contexts/loggedUser";
import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

const createGuestRoute = () => {
    const loggedUser = useLoggedUser();
    const navigate = useNavigate();

    createEffect(() => {
        if (loggedUser?.data()) {
            navigate("/");
        }
    });
};

export default createGuestRoute;
