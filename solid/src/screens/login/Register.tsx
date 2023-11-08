import { createEffect, createSignal } from "solid-js";
import { useRegisterMutation } from "@/queries/users";

import Submit from "@/components/ui/Submit";
import Field from "./Field";
import Input from "@/components/ui/Input";
import { TErrorRecord } from "@/types";
import Errors from "@/components/ui/Errors";

const Register = () => {
    const [username, setUsername] = createSignal("sm");
    const [password, setPassword] = createSignal("123");

    const [errors, setErrors] = createSignal<TErrorRecord | undefined>({});

    const registerMutation = useRegisterMutation();

    createEffect(() => {
        setErrors(registerMutation.error?.errors);
    });

    const handleSubmit = () => {
        let isNotValid = false;
        if (username().length < 3) {
            setErrors({ ...errors(), username: ["length must be 3 characters", "hello"] });
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
                        />
                    }
                />
                <Errors errors={errors()} />
                <div class="flex justify-end">
                    <Submit label="create account" />
                </div>
            </form>
        </div>
    );
};

export default Register;
