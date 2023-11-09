import { createEffect, createSignal } from "solid-js";
import { createLoginMutation } from "@/queries/users";
import { useNavigate } from "@solidjs/router";

import Submit from "@/components/ui/Submit";
import Field from "./Field";
import Input from "@/components/ui/Input";

const Login = () => {
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");

    const [errorUsername, setErrorUsername] = createSignal("");
    const [errorPassword, setErrorPassword] = createSignal("");

    const loginMutation = createLoginMutation();

    const navigate = useNavigate();

    createEffect(() => {
        if (loginMutation.isSuccess) {
            navigate("/");
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

export default Login;
