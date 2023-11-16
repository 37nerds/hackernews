import { createGetNewsQuery } from "@/queries/users";
import { Show } from "solid-js";
import { useSearchParams } from "@solidjs/router";

import Newses from "@/components/Newses";
import More from "@/components/ui/More";
import Loading from "@/components/ui/Loading";

export default () => {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.page);

    const { query, setPage } = createGetNewsQuery();

    setPage(page || 1);

    return (
        <main class="flex flex-col gap-3">
            <Show when={!query.isLoading} fallback={<Loading />}>
                <Newses newses={query?.data || []} />
                <More href={"/?page=2"} />
            </Show>
        </main>
    );
};
