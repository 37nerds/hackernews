import Newses from "@/components/Newses";
import More from "@/components/ui/More";

import newses from "@/data/newses";

export default () => {
    return (
        <main class="flex flex-col gap-3">
            <Newses newses={newses} />
            <More href={"/?p=2"} />
        </main>
    );
};
