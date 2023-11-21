import type { TNews } from "@/queries/newses";

import { For, Show, Suspense } from "solid-js";
import { A } from "@solidjs/router";
import { display_from_now } from "@/helpers/time";
import { news_per_page } from "@/config/misc";

import Triangle from "@/components/icons/Triangle";
import Loading from "./ui/Loading";

const News = (p: TNews & { no: number }) => {
    return (
        <div class="flex gap-1 rounded bg-primary-bg px-1 py-0.5">
            <div class="items-top flex gap-1">
                <div class="min-w-5 text-end text-secondary">{p.no}.</div>
                <button
                    class="items-top flex h-3 w-3"
                    onClick={() => {
                        console.log(`voted on ${p._id}`);
                    }}
                >
                    <Triangle />
                </button>
            </div>
            <div class="flex flex-col">
                <div class="flex items-center gap-1">
                    <A href={p.url} target="_blank" class="text-primay text-sm">
                        {p.title}
                    </A>
                    <A href={`/from?site=${p.domain}`} class="text-[11px] text-secondary hover:underline">
                        ({p.domain})
                    </A>
                </div>
                <div class="text-[11px] text-secondary">
                    {p.points} points by{" "}
                    <A href={`/user/${p.user}`} class="hover:underline">
                        {p.user}
                    </A>{" "}
                    |{" "}
                    <A title={new Date().toUTCString()} href={`/item?id=${p._id}`} class="hover:underline">
                        {display_from_now(p.created_at)}
                    </A>{" "}
                    | <button class="hover:underline">hide</button> |{" "}
                    <A href={`/item?id=${p._id}`} class="hover:underline">
                        {p.comments_count} comments
                    </A>
                </div>
            </div>
        </div>
    );
};

const NewsesList = (p: { newses: TNews[]; page?: number; total?: number }) => {
    return (
        <div class="flex flex-col gap-1">
            <For each={p.newses}>
                {(news: TNews, i) => (
                    <News
                        no={(p.total || 30) * ((p.page || 1) - 1) + i() + 1}
                        _id={news._id}
                        title={news.title}
                        url={news.url}
                        domain={news.domain}
                        points={news.points}
                        user={news.user}
                        comments_count={news.comments_count}
                        type={news.type}
                        created_at={news.created_at}
                        deleted_at={news.deleted_at}
                        updated_at={news.updated_at}
                    />
                )}
            </For>
        </div>
    );
};

const More = (p: { href: string; label?: string }) => {
    return (
        <div class="flex justify-end">
            <A href={p.href} class="px-1 underline">
                {p.label || "More"}
            </A>
        </div>
    );
};

const NoStories = () => {
    return <div class="py-5 text-center text-lg text-red-500">There is no stories</div>;
};

const Newses = (p: { loading: boolean; newses: TNews[]; page: number; more_page_prefix?: string }) => {
    return (
        <div class="flex flex-col gap-3">
            <Suspense fallback={<Loading message="Suspense loading in Newses ..." />}>
                <Show when={!p.loading} fallback={<Loading message="Show loading in Newses ..." />}>
                    <Show when={p.newses.length !== 0} fallback={<NoStories />}>
                        <NewsesList newses={p.newses} page={p.page || 1} total={news_per_page} />
                        <div class="flex justify-end">
                            <Show when={p.page - 1}>
                                <More label="Less" href={`${p.more_page_prefix || "/?"}page=${p.page - 1}`} />
                            </Show>
                            <Show when={p.newses.length === news_per_page}>
                                <More href={`${p.more_page_prefix || "/?"}page=${p.page + 1}`} />
                            </Show>
                        </div>
                    </Show>
                </Show>
            </Suspense>
        </div>
    );
};

export default Newses;
