import { Show, createEffect, createSignal } from "solid-js";
import { loggedUserData } from "@/states/layout";
import { createIsLoggedUser } from "@/pages/user";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Item from "@/screens/user/Item";
import Submit from "@/components/ui/Submit";

const convertBooleanToYesNo = (value: boolean): "yes" | "no" => {
    return value ? "yes" : "no";
};

const convertYesNoToBoolean = (value: string): boolean => {
    return value === "yes";
};

const UForm = () => {
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

    const isLoggedUser = createIsLoggedUser();

    createEffect(() => {
        if (isLoggedUser()) {
            const user = loggedUserData();
            setUsername(user?.username || "");
            setCreateAt(user?.createdAt || "");
            setKarma(user?.karma || 0);
            setAbout(user?.about || "");
            setEmail(user?.email || "");
            setShowdead(user?.showdead || false);
            setNoprocrast(user?.noprocrast || false);
            setMaxvisit(user?.maxvisit || 0);
            setMinaway(user?.minaway || 0);
            setDelay(user?.delay || 0);
        } else {
            console.log("here");
        }
    });

    return (
        <form class="flex flex-col gap-2">
            <Item label="user" value={<span class="text-[#3c963d]">{username()}</span>} />
            <Item label="created" value={createdAt()} />
            <Item label="karma" value={karma()} />
            <Item
                label="about"
                value={
                    isLoggedUser() ? (
                        <Textarea
                            id="about"
                            value={about()}
                            setValue={setAbout}
                            disabled={!isLoggedUser()}
                        />
                    ) : (
                        <div>{about()}</div>
                    )
                }
            />
            <Show when={isLoggedUser()}>
                <Item
                    label="email"
                    value={
                        <Input
                            type="email"
                            id="email"
                            value={email()}
                            setValue={setEmail}
                            disabled={!isLoggedUser()}
                        />
                    }
                />
                <Item
                    label="showdead"
                    value={
                        <Select
                            id="showdead"
                            value={convertBooleanToYesNo(showdead())}
                            setValue={v => setShowdead(convertYesNoToBoolean(v))}
                            options={[
                                { label: "no", value: "no" },
                                { label: "yes", value: "yes" },
                            ]}
                            disabled={!isLoggedUser()}
                        />
                    }
                />
                <Item
                    label="noprocrast"
                    value={
                        <Select
                            id="noprocrast"
                            value={convertBooleanToYesNo(noprocrast())}
                            setValue={v => setNoprocrast(convertYesNoToBoolean(v))}
                            options={[
                                { label: "no", value: "no" },
                                { label: "yes", value: "yes" },
                            ]}
                            disabled={!isLoggedUser()}
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
                            disabled={!isLoggedUser()}
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
                            disabled={!isLoggedUser()}
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
                            disabled={!isLoggedUser()}
                        />
                    }
                />
                <div class="flex justify-end">
                    <Submit label="Update" />
                </div>
            </Show>
        </form>
    );
};

export default UForm;
