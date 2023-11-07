import useHideFooter from "@/hooks/useHideFooter";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Item from "@/screens/user/Item";

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
                <Item
                    label="showdead"
                    value={
                        <Select
                            id="showdead"
                            value={"no"}
                            setValue={value => {
                                console.log(value);
                            }}
                            options={[
                                { label: "no", value: "no" },
                                { label: "yes", value: "yes" },
                            ]}
                        />
                    }
                />
                <Item
                    label="noprocrast"
                    value={
                        <Select
                            id="noprocrast"
                            value={"yes"}
                            setValue={value => {
                                console.log(value);
                            }}
                            options={[
                                { label: "no", value: "no" },
                                { label: "yes", value: "yes" },
                            ]}
                        />
                    }
                />
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
