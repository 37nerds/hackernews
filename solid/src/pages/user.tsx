import { JSX, Show, createEffect, createSignal } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import { createUpdateProfileMutation, createUserByUsernameQuery } from "@/queries/users";
import { display_from_now } from "@/helpers/time";
import { convert_boolean_to_yes_no, convert_yes_no_to_boolean } from "@/helpers/utils";
import { useLoggedUser } from "@/contexts/loggedUser";
import { createHideFooter } from "@/helpers/primitives";

import log from "@/helpers/log";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Submit from "@/components/ui/Submit";
import PWrapper from "@/components/ui/PWrapper";
import Link from "@/components/ui/Link";
import Button from "@/components/ui/Button";

const UserPageLinks = (p: { isLoggedUser: boolean }) => {
    return (
        <div class="flex flex-col gap-1 pl-[98px]">
            <Show when={p.isLoggedUser}>
                <Link label="change password" href="/change-password" />
            </Show>
            <Link label="submissions" href="/submissions" />
            <Link label="comments" href="/comments" />
            <Show when={p.isLoggedUser}>
                <Link label="hidden" href="/hidden" />
                <Link label="favorites submissions" href="/favorites" />
                <Link label="favorites comments" href="/favorites?comments=true" />
            </Show>
            <Show when={!p.isLoggedUser}>
                <Link label="favorites" href="/favorites" />
            </Show>
        </div>
    );
};

const Item = (p: { label: string; value: string | JSX.Element }) => {
    return (
        <div class="flex">
            <span class="w-28 text-secondary">{p.label}: </span>
            <span class="w-full">{p.value}</span>
        </div>
    );
};

const UserDetails = (p: { isLoggedUser: boolean }) => {
    const [isEdit, setIsEdit] = createSignal(false);

    const [username, setUsername] = createSignal<string>("");
    const [createdAt, setCreateAt] = createSignal<string>("");
    const [karma, setKarma] = createSignal<number>(0);
    const [about, setAbout] = createSignal<string>("");
    const [email, setEmail] = createSignal<string>("");
    const [showdead, setShowdead] = createSignal<boolean>(false);
    const [noprocrast, setNoprocrast] = createSignal<boolean>(false);
    const [maxvisit, setMaxvisit] = createSignal<number>(0);
    const [minaway, setMinaway] = createSignal<number>(0);
    const [delay, setDelay] = createSignal<number>(0);

    const loggedUser = useLoggedUser();
    const params = useParams();

    const { userByUsernameQuery, setEnabled } = createUserByUsernameQuery(params.id || "");

    createEffect(() => {
        if (p.isLoggedUser) {
            console.log("here", loggedUser?.data());
            if (loggedUser?.data()) {
                setUsername(loggedUser?.data()?.username || "");
                setCreateAt(loggedUser?.data()?.created_at || "");
                setKarma(loggedUser?.data()?.karma || 0);
                setAbout(loggedUser?.data()?.about || "");
                setEmail(loggedUser?.data()?.email || "");
                setShowdead(loggedUser?.data()?.showdead || false);
                setNoprocrast(loggedUser?.data()?.noprocrast || false);
                setMaxvisit(loggedUser?.data()?.maxvisit || 0);
                setMinaway(loggedUser?.data()?.minaway || 0);
                setDelay(loggedUser?.data()?.delay || 0);
            } else {
                console.log("user is null");
            }
        } else {
            setEnabled(true);
        }
    });

    createEffect(() => {
        console.log("here is the problem", username());
    });

    const [isUserExist, setIsUserExist] = createSignal<boolean>(true);

    createEffect(() => {
        if (userByUsernameQuery.isError) {
            setIsUserExist(false);
        }
        if (userByUsernameQuery.isSuccess && userByUsernameQuery.data) {
            const user = userByUsernameQuery.data;
            setUsername(user?.username || "");
            setCreateAt(user?.created_at || "");
            setKarma(user?.karma || 0);
            setAbout(user?.about || "");
        }
    });

    const updateProfileMutation = createUpdateProfileMutation();

    createEffect(() => {
        if (updateProfileMutation.isSuccess) {
            log.show.toast("profile updated successfully");
            loggedUser?.setData(updateProfileMutation.data);
            setIsEdit(false);
        }
    });

    return (
        <Show when={isUserExist()} fallback={<div class="text-center text-red-500">user not exist</div>}>
            <div class="flex justify-end">
                <Show when={!isEdit() && p.isLoggedUser}>
                    <Button onClick={() => setIsEdit(true)} class="bg-green-500 text-white">
                        Edit
                    </Button>
                </Show>
            </div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    updateProfileMutation.mutate({
                        email: email(),
                        about: about(),
                        showdead: showdead(),
                        noprocrast: noprocrast(),
                        maxvisit: maxvisit(),
                        minaway: minaway(),
                        delay: delay(),
                    });
                }}
                class="flex flex-col gap-2"
            >
                <Item label="user" value={<span class="text-[#3c963d]">{username()}</span>} />
                <Item label="created" value={display_from_now(createdAt())} />
                <Item label="karma" value={karma()} />
                <Item
                    label="about"
                    value={
                        p.isLoggedUser && isEdit() ? (
                            <Textarea
                                id="about"
                                value={about()}
                                setValue={setAbout}
                                disabled={!p.isLoggedUser || !isEdit()}
                            />
                        ) : (
                            <div class="text-justify">{about()}</div>
                        )
                    }
                />
                <Show when={p.isLoggedUser}>
                    <Item
                        label="email"
                        value={
                            <Input
                                type="email"
                                id="email"
                                value={email()}
                                setValue={setEmail}
                                disabled={!p.isLoggedUser || !isEdit()}
                            />
                        }
                    />
                    <Item
                        label="showdead"
                        value={
                            <Select
                                id="showdead"
                                value={convert_boolean_to_yes_no(showdead())}
                                setValue={v => setShowdead(convert_yes_no_to_boolean(v))}
                                options={[
                                    { label: "no", value: "no" },
                                    { label: "yes", value: "yes" },
                                ]}
                                disabled={!p.isLoggedUser || !isEdit()}
                            />
                        }
                    />
                    <Item
                        label="noprocrast"
                        value={
                            <Select
                                id="noprocrast"
                                value={convert_boolean_to_yes_no(noprocrast())}
                                setValue={v => setNoprocrast(convert_yes_no_to_boolean(v))}
                                options={[
                                    { label: "no", value: "no" },
                                    { label: "yes", value: "yes" },
                                ]}
                                disabled={!p.isLoggedUser || !isEdit()}
                            />
                        }
                    />
                    <Item
                        label="maxvisit"
                        value={
                            <Input
                                type="number"
                                id="maxvisit"
                                value={String(maxvisit())}
                                setValue={v => setMaxvisit(Number(v))}
                                disabled={!p.isLoggedUser || !isEdit()}
                            />
                        }
                    />
                    <Item
                        label="minaway"
                        value={
                            <Input
                                type="number"
                                id="minaway"
                                value={String(minaway())}
                                setValue={v => setMinaway(Number(v))}
                                disabled={!p.isLoggedUser || !isEdit()}
                            />
                        }
                    />
                    <Item
                        label="delay"
                        value={
                            <Input
                                type="number"
                                id="delay"
                                value={String(delay())}
                                setValue={v => setDelay(Number(v))}
                                disabled={!p.isLoggedUser || !isEdit()}
                            />
                        }
                    />
                    <div class="flex justify-end">
                        <Show when={isEdit()}>
                            <Submit label="Update" />
                        </Show>
                    </div>
                </Show>
            </form>
            <UserPageLinks isLoggedUser={p.isLoggedUser} />
        </Show>
    );
};

export default () => {
    createHideFooter();

    const navigate = useNavigate();
    const params = useParams();
    const loggedUser = useLoggedUser();

    console.log("interesting", params.id, loggedUser?.data());

    const [isLoggedUser, setIsLoggedUser] = createSignal<boolean>(false);

    if (!params.id) {
        if (!loggedUser?.data()) {
            navigate("/");
        } else {
            setIsLoggedUser(true);
        }
    }

    return (
        <PWrapper>
            <div class="mx-auto flex w-[600px] flex-col gap-2">
                <UserDetails isLoggedUser={isLoggedUser()} />
            </div>
        </PWrapper>
    );
};
