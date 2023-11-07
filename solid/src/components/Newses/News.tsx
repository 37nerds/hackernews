import { A } from "@solidjs/router";

import Triangle from "@/components/icons/Triangle";

export type TNews = {
    id: number;
    title: string;
    points: number | null;
    user: string | null;
    time: number;
    time_ago: string;
    comments_count: number;
    type: string;
    url: string;
    domain?: string;
};

const News = (p: TNews & { no: number }) => {
    return (
        <div class="flex gap-1 bg-primary-bg px-1 py-0.5">
            <div class="items-top flex gap-1">
                <div class="w-5 text-end text-secondary">{p.no}.</div>
                <button
                    class="items-top flex h-3 w-3"
                    onClick={() => {
                        console.log(`votted on ${p.id}`);
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
                    <A
                        href={`/from?site=${p.domain}`}
                        class="text-[11px] text-secondary hover:underline"
                    >
                        ({p.domain})
                    </A>
                </div>
                <div class="text-[11px] text-secondary">
                    {p.points} points by{" "}
                    <A href={`/user?id=${p.user}`} class="hover:underline">
                        {p.user}
                    </A>{" "}
                    <A
                        title={new Date().toUTCString()}
                        href={`/item?id=${p.id}`}
                        class="hover:underline"
                    >
                        {p.time_ago}
                    </A>{" "}
                    | <button class="hover:underline">hide</button> |{" "}
                    <A href={`/item?id=${p.id}`} class="hover:underline">
                        {p.comments_count} comments
                    </A>
                </div>
            </div>
        </div>
    );
};

export default News;
