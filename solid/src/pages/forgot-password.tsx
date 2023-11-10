import { JSX, Switch, Match } from "solid-js";

import Submit from "@/components/ui/Submit";
import Container2 from "@/components/ui/Container2";

const Message = () => {
    return (
        <div class="p-10 text-center">
            Password recovery message sent. If you don't see it, you might want to check your spam
            folder.
        </div>
    );
};

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

const SentMailForm = () => {
    return (
        <Container2 class="flex flex-col gap-2 p-10">
            <h2 class="text-lg font-bold">Reset your password</h2>
            <div class="flex flex-col gap-2">
                <Field id="username" input={<div>hello</div>} />
                <div class="flex justify-end">
                    <Submit label="Send reset email" />
                </div>
            </div>
        </Container2>
    );
};

export default () => {
    const emailSented = false;

    return (
        <Switch>
            <Match when={!emailSented}>
                <SentMailForm />
            </Match>
            <Match when={emailSented}>
                <Message />
            </Match>
        </Switch>
    );
};
