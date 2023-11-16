import { createEffect, createSignal } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import { createResetPasswordMutation } from "@/queries/users";
import { createHideFooter, createOnlyOneNavLink, createHideRightNavLinks } from "@/helpers/primitives";

import Container2 from "@/components/ui/Container2";
import Submit from "@/components/ui/Submit";
import PWrapper from "@/components/ui/PWrapper";
import Input from "@/components/ui/Input";

export default () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    if (!searchParams.token || !searchParams.username) {
        navigate("/");
    }

    createHideFooter();
    createHideRightNavLinks();

    const [password, setPassword] = createSignal("");

    createOnlyOneNavLink(`Reset Password for ${searchParams.username}`, "/reset-password");

    const resetPasswordMutation = createResetPasswordMutation();

    createEffect(() => {
        if (resetPasswordMutation.isSuccess) {
            navigate("/login");
        }
    });

    return (
        <PWrapper>
            <Container2>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        resetPasswordMutation.mutate({
                            password: password(),
                            token: searchParams.token,
                        });
                    }}
                    class="flex flex-col gap-2 p-2"
                >
                    <div class="flex items-center gap-2">
                        <label for="password" class="w-40">
                            New Password:{" "}
                        </label>
                        <Input value={password()} setValue={setPassword} id="password" type="password" />
                    </div>
                    <div class="flex justify-end">
                        <Submit label="Change" />
                    </div>
                </form>
            </Container2>
        </PWrapper>
    );
};
