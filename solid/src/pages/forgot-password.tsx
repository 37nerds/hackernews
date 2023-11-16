import { JSX, createSignal, Show, createEffect } from "solid-js";
import { createForgotPasswordMutation } from "@/queries/users";

import Submit from "@/components/ui/Submit";
import Container2 from "@/components/ui/Container2";
import Input from "@/components/ui/Input";

const Message = () => (
    <div class="p-10 text-center">
        Password recovery message sent. If you don't see it, you might want to check your spam folder.
    </div>
);

const Field = (p: { label?: string; id: string; input: JSX.Element }) => (
    <div class="flex items-center gap-2">
        <label for={p.id} class="w-28">
            {p.label || p.id}:{" "}
        </label>
        {p.input}
    </div>
);

export default () => {
    const [emailSented, setEmailSented] = createSignal(false);
    const [email, setEmail] = createSignal("");

    const forgotPasswordMutation = createForgotPasswordMutation();

    createEffect(() => {
        if (forgotPasswordMutation.isSuccess) {
            setEmailSented(true);
        }
    });

    return (
        <Show when={!emailSented()} fallback={<Message />}>
            <Container2 class="flex flex-col gap-2 p-10">
                <h2 class="text-lg font-bold">Reset your password</h2>
                <form
                    class="flex flex-col gap-2"
                    onSubmit={e => {
                        e.preventDefault();
                        forgotPasswordMutation.mutate({ email: email() });
                    }}
                >
                    <Field
                        id="username"
                        input={<Input value={email()} setValue={setEmail} id="email" type="email" required={true} />}
                    />
                    <div class="flex justify-end">
                        <Submit label="Send reset email" />
                    </div>
                </form>
            </Container2>
        </Show>
    );
};
