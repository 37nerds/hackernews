import { nav_links } from "@/config/links";
import { setNavLinks } from "@/states/layout";
import { onCleanup, onMount } from "solid-js";
import { Title } from "@solidjs/meta";

import useHideFooter from "@/hooks/useHideFooter";

import Container2 from "@/components/ui/Container2";
import Submit from "@/components/ui/Submit";
import PWrapper from "@/components/ui/PWrapper";
import Input from "@/components/ui/Input";

export default () => {
    const pageMessage = "Change Password for p-nerd";

    useHideFooter();

    onMount(() => {
        setNavLinks([{ title: pageMessage, href: "/change-password" }]);
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
                            <label for="password" class="w-48">
                                Current Password:{" "}
                            </label>
                            <Input
                                value={""}
                                setValue={value => {
                                    console.log(value);
                                }}
                                id="password"
                                type="password"
                            />
                        </div>
                        <div class="flex items-center gap-2">
                            <label for="password" class="w-48">
                                New Password:{" "}
                            </label>
                            <Input
                                value={""}
                                setValue={value => {
                                    console.log(value);
                                }}
                                id="password"
                                type="password"
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
