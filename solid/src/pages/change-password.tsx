import { JSX, createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { createChangePasswordMutation } from "@/queries/users";
import { useLoggedUser } from "@/contexts/loggedUser";

import createHideFooter from "@/primitives/createHideFooter.ts";
import createOnlyOneNavLink from "@/primitives/createOnlyOneNavLink";
import log from "@/helpers/log";

import Container2 from "@/components/ui/Container2";
import Submit from "@/components/ui/Submit";
import PWrapper from "@/components/ui/PWrapper";
import Input from "@/components/ui/Input";

const Field = (p: { label: string; input: JSX.Element }) => (
    <div class="flex items-center gap-2">
        <label for="password" class="w-48">
            {p.label}:{" "}
        </label>
        {p.input}
    </div>
);

const From = () => {
    const [currentPassword, setCurrentPassword] = createSignal("");
    const [newPassword, setNewPassword] = createSignal("");

    const changePasswordMutation = createChangePasswordMutation();
    const navigate = useNavigate();

    createEffect(() => {
        if (changePasswordMutation.isSuccess) {
            log.show.toast("password changed successfully");
            navigate("/user");
        }
    });

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                changePasswordMutation.mutate({
                    current_password: currentPassword(),
                    new_password: newPassword(),
                });
            }}
            class="flex flex-col gap-2 p-2"
        >
            <Field
                label="Current password"
                input={
                    <Input
                        value={currentPassword()}
                        setValue={setCurrentPassword}
                        id="current-password"
                        type="password"
                    />
                }
            />
            <Field
                label="New password"
                input={<Input value={newPassword()} setValue={setNewPassword} id="new-password" type="password" />}
            />
            <div class="flex justify-end">
                <Submit label="change" />
            </div>
        </form>
    );
};

export default () => {
    const navigate = useNavigate();

    const loggedUser = useLoggedUser();

    createEffect(() => {
        if (!loggedUser?.data()) {
            navigate("/");
        }
    });

    createHideFooter();

    createEffect(() => {
        createOnlyOneNavLink(`Change Password for ${loggedUser?.data()?.username || ""}`, "/change-password");
    });

    return (
        <PWrapper>
            <Container2>
                <From />
            </Container2>
        </PWrapper>
    );
};
