import { Show, createEffect } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { news_per_page } from "@/config/misc";
import { createGetNewsesQuery } from "@/queries/newses";

import Newses from "@/components/Newses";
import More from "@/components/ui/More";
import Loading from "@/components/ui/Loading";

export default () => {
    const [searchParams] = useSearchParams();

    const { query, setPage } = createGetNewsesQuery();

    const page = () => Number(searchParams.page) || 1;

    createEffect(() => {
        setPage(page());
    });

    return (
        <main class="flex flex-col gap-3">
            <Show when={!query.isLoading} fallback={<Loading />}>
                <Newses newses={query?.data || []} page={page()} total={news_per_page} />
                <More href={"/?page=2"} />
            </Show>
        </main>
    );
};
