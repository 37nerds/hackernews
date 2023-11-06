import Triangle from "../icons/Triangle";

export type TNews = {
    id: number;
    title: string;
    points: number;
    user: string;
    time: number;
    time_ago: string;
    comments_count: number;
    type: string;
    url: string;
    domain: string;
};

export default (p: TNews & { no: number }) => {
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
                    <a href={p.url} target="_blank" class="text-primay text-sm">
                        {p.title}
                    </a>
                    <a
                        href={`/from?site=${p.domain}`}
                        class="text-[11px] text-secondary hover:underline"
                    >
                        ({p.domain})
                    </a>
                </div>
                <div class="text-[11px] text-secondary">
                    {p.points} points by{" "}
                    <a href={`/user?id=${p.user}`} class="hover:underline">
                        {p.user}
                    </a>
                    <span title={new Date().toUTCString()}>
                        <a href={`/item?id=${p.id}`} class="hover:underline">
                            {" "}
                            {p.time_ago}
                        </a>
                    </span>{" "}
                    | <button class="hover:underline">hide</button> |{" "}
                    <a href={`/item?id=${p.id}`} class="hover:underline">
                        {p.comments_count} comments
                    </a>
                </div>
            </div>
        </div>
    );
};
