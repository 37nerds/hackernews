import { JSX, createEffect, createSignal } from "solid-js";
import { createLoginMutation } from "@/queries/users";
import { useNavigate } from "@solidjs/router";

import { createRegisterMutation } from "@/queries/users";

import Link from "@/components/ui/Link";
import Submit from "@/components/ui/Submit";
import Input from "@/components/ui/Input";
import createGuestRoute from "@/primitives/createGuestRoute";

const Field = (p: { label?: string; id: string; input: JSX.Element }) => {
    return (
        <div class="flex items-center gap-2">
            <label for={p.id} class="w-28">
                {p.label || p.id}:{" "}
            </label>
            {p.input}
        </div>
    );
};

const Login = () => {
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");

    const [errorUsername, setErrorUsername] = createSignal("");
    const [errorPassword, setErrorPassword] = createSignal("");

    const loginMutation = createLoginMutation();

    /**
     * TODO make navigation work
     */
    //  const navigate = useNavigate();

    createEffect(() => {
        if (loginMutation.isSuccess) {
            //       navigate("/");
            window.location.reload();
        }
        if (loginMutation.isError) {
            setErrorUsername("invalid credientails");
            setErrorPassword("invalid credientails");
        }
    });

    const handleSubmit = () => {
        loginMutation.mutate({ username: username(), password: password() });
    };

    return (
        <div class="flex flex-col gap-5">
            <h2 class="text-lg font-bold">Login</h2>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}
                class="flex flex-col gap-2"
            >
                <Field
                    label="username"
                    id="username"
                    input={
                        <Input
                            value={username()}
                            setValue={setUsername}
                            type="text"
                            id="username"
                            errorMessage={errorUsername()}
                            required={true}
                        />
                    }
                />
                <Field
                    label="password"
                    id="password"
                    input={
                        <Input
                            value={password()}
                            setValue={setPassword}
                            type="password"
                            id="password"
                            errorMessage={errorPassword()}
                            required={true}
                        />
                    }
                />
                <div class="flex justify-end">
                    <Submit label="login" />
                </div>
            </form>
        </div>
    );
};

const Register = () => {
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");

    const [errorUsername, setErrorUsername] = createSignal("");
    const [errorPassword, setErrorPassword] = createSignal("");

    const registerMutation = createRegisterMutation();

    const navigate = useNavigate();

    createEffect(() => {
        if (registerMutation.isSuccess) {
            navigate("/user");
        }
        if (registerMutation.isError) {
            setErrorUsername(registerMutation.error?.errors?.username || "");
            setErrorPassword(registerMutation.error?.errors?.password || "");
        }
    });

    const handleSubmit = () => {
        let isNotValid = false;
        if (username().length < 3) {
            setErrorUsername("length must be 3 characters");
            isNotValid = true;
        }
        if (password().length < 6) {
            setErrorPassword("length must be 6 characters");
            isNotValid = true;
        }

        if (!isNotValid) registerMutation.mutate({ username: username(), password: password() });
    };

    return (
        <div class="flex flex-col gap-5">
            <h2 class="text-lg font-bold">Register</h2>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}
                class="flex flex-col gap-2"
            >
                <Field
                    label="username"
                    id="register-username"
                    input={
                        <Input
                            value={username()}
                            setValue={setUsername}
                            type="text"
                            id="register-username"
                            errorMessage={errorUsername()}
                            required={true}
                        />
                    }
                />
                <Field
                    label="password"
                    id="register-password"
                    input={
                        <Input
                            value={password()}
                            setValue={setPassword}
                            type="password"
                            id="register-password"
                            errorMessage={errorPassword()}
                            required={true}
                        />
                    }
                />
                <div class="flex justify-end">
                    <Submit label="create account" />
                </div>
            </form>
        </div>
    );
};

export default () => {
    createGuestRoute();

    return (
        <div class="mx-auto flex w-[450px] flex-col gap-5 p-10">
            <Login />
            <Link label="Forgot your password?" href="/forgot-password" />
            <Register />
        </div>
    );
};
