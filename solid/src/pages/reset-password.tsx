import { nav_links } from "@/config/links";
import { setNavLinks } from "@/states/layout";
import { onCleanup, onMount } from "solid-js";
import { Title } from "@solidjs/meta";

import useHideFooter from "@/hooks/useHideFooter";
import useHideRightNavLinks from "@/hooks/useHideRightNavLinks";

import Container2 from "@/components/ui/Container2";
import Submit from "@/components/ui/Submit";
import PWrapper from "@/components/ui/PWrapper";
import Input from "@/components/ui/Input";

export default () => {
    const pageMessage = "Reset Password for p-nerd";

    useHideFooter();
    useHideRightNavLinks();

    onMount(() => {
        setNavLinks([{ title: pageMessage, href: "/reset-password" }]);
    });
    onCleanup(() => {
        setNavLinks(() => nav_links);
    });

    return (
        <>
            <Title>{pageMessage}</Title>
            <PWrapper>
                <Container2>
                    <form class="flex flex-col gap-2 p-2">
                        <div class="flex items-center gap-2">
                            <label for="password" class="w-40">
                                New Password:{" "}
                            </label>
                            <Input
                                value={""}
                                setValue={value => {
                                    console.log(value);
                                }}
                                id="password"
                            />
                        </div>
                        <div class="flex justify-end">
                            <Submit label="change" />
                        </div>
                    </form>
                </Container2>
            </PWrapper>
        </>
    );
};
