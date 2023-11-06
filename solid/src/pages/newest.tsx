import Newses from "@/components/Newses";

import newses from "@/data/newses";

export default () => {
    return (
        <main class="flex flex-col gap-3">
            <Newses newses={newses} />
        </main>
    );
};
