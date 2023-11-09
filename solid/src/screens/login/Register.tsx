import { createEffect, createSignal } from "solid-js";
import { createRegisterMutation } from "@/queries/users";
import { useNavigate } from "@solidjs/router";

import Submit from "@/components/ui/Submit";
import Field from "./Field";
import Input from "@/components/ui/Input";

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

export default Register;
