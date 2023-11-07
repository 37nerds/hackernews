import { JSX } from "solid-js";

import useHideFooter from "@/hooks/useHideFooter";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

const Item = (p: { label: string; value: string | JSX.Element }) => {
    return (
        <div class="flex">
            <span class="w-28 text-secondary">{p.label}: </span>
            <span class="w-full">{p.value}</span>
        </div>
    );
};

export default () => {
    useHideFooter();

    return (
        <div class="bg-primary-bg p-5">
            <div class="mx-auto flex w-[600px] flex-col gap-2">
                <Item label="user" value={<span class="text-[#3c963d]"> p-nerd</span>} />
                <Item label="created" value={"1 days ago"} />
                <Item label="karma" value={"1"} />
                <Item
                    label="about"
                    value={
                        <Textarea
                            id="about"
                            value={""}
                            setValue={value => {
                                console.log(value);
                            }}
                        />
                    }
                />
                <Item
                    label="email"
                    value={
                        <Input
                            type="email"
                            id="email"
                            value={"shihab4t@gmail.com"}
                            setValue={value => {
                                console.log(value);
                            }}
                        />
                    }
                />
                <Item label="showdead" value={"no"} />
                <Item label="noprocrast" value={"no"} />
                <Item
                    label="maxvisit"
                    value={
                        <Input
                            type="number"
                            id="maxvisit"
                            value={"20"}
                            setValue={value => {
                                console.log(value);
                            }}
                        />
                    }
                />
                <Item
                    label="minaway"
                    value={
                        <Input
                            type="number"
                            id="maxvisit"
                            value={"180"}
                            setValue={value => {
                                console.log(value);
                            }}
                        />
                    }
                />{" "}
                <Item
                    label="delay"
                    value={
                        <Input
                            type="number"
                            id="delay"
                            value={"0"}
                            setValue={value => {
                                console.log(value);
                            }}
                        />
                    }
                />
            </div>
        </div>
    );
};
