import { createGetNewsQuery } from "@/queries/users";
import { Show } from "solid-js";

import Newses from "@/components/Newses";
import More from "@/components/ui/More";
import Loading from "@/components/ui/Loading";

export default () => {
    const getNewsQuery = createGetNewsQuery();

    return (
        <main class="flex flex-col gap-3">
            <Show when={!getNewsQuery.isLoading} fallback={<Loading />}>
                <Newses newses={getNewsQuery?.data || []} />
                <More href={"/?p=2"} />
            </Show>
        </main>
    );
};
